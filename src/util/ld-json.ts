import { getImage } from 'gatsby-plugin-image';
import { WithContext, Thing, Blog, BlogPosting, Article, WebPage, Person } from 'schema-dts';

type CmpFn = (a: any, b: any) => number;
type StringifyOpts = {
  cmp?: CmpFn;
  cycles?: boolean;
};
const jsonStringifySorted = (data: any, optsIn: StringifyOpts | CmpFn = {}) => {
  let opts: StringifyOpts;
  if (typeof optsIn === `function`) opts = { cmp: optsIn };
  else opts = optsIn;
  const cycles = typeof opts.cycles === `boolean` ? opts.cycles : false;

  const cmp =
    opts.cmp &&
    ((f) => (node: any) => (a: any, b: any) => {
      const aObj = { key: a, value: node[a] };
      const bObj = { key: b, value: node[b] };
      return f(aObj, bObj);
    })(opts.cmp);

  const seen: any[] = [];
  const stringify = (node: any): string => {
    if (node && node.toJSON && typeof node.toJSON === `function`) {
      // eslint-disable-next-line no-param-reassign
      node = node.toJSON();
    }

    if (node === undefined) return ``;
    if (typeof node === `number`) return Number.isFinite(node) ? `${node}` : `null`;
    if (typeof node !== `object`) return JSON.stringify(node);

    let i;
    let out;
    if (Array.isArray(node)) {
      out = `[`;
      for (i = 0; i < node.length; i += 1) {
        if (i) out += `,`;
        out += stringify(node[i]) || `null`;
      }
      return `${out}]`;
    }

    if (node === null) return `null`;

    if (seen.indexOf(node) !== -1) {
      if (cycles) return JSON.stringify(`__cycle__`);
      throw new TypeError(`Converting circular structure to JSON`);
    }

    const seenIndex = seen.push(node) - 1;
    const keys = Object.keys(node).sort(cmp && cmp(node));
    out = ``;
    for (i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = stringify(node[key]);

      if (value) {
        if (out) out += `,`;
        out += `${JSON.stringify(key)}:${value}`;
      }
    }
    seen.splice(seenIndex, 1);
    return `{${out}}`;
  };
  return stringify(data);
};

type PersonSourceData = {
  name: string;
  url: string;
};
type ArticleSourceData = {
  frontmatter?: {
    heroImage?: { childImageSharp?: { gatsbyImageData: any } | null } | null;
    author?: PersonSourceData | null;
  } | null;
  fields: {
    source: string;
    slug: string;
    title: string;
    date: Date;
  };
};

export const makePerson = ({ name, url }: PersonSourceData): Person => ({
  '@type': `Person`,
  name,
  url,
});

export const makeArticle = (
  siteUrl: string,
  { frontmatter, fields }: ArticleSourceData,
): Article => {
  const img = getImage(frontmatter?.heroImage?.childImageSharp?.gatsbyImageData);
  const mainEntityOfPage: WebPage = {
    '@type': `WebPage`,
    url: `${siteUrl}/${fields.source}/${fields.slug}`,
  };
  return {
    '@type': `Article`,
    mainEntityOfPage,
    author: frontmatter?.author ? makePerson(frontmatter.author) : undefined,
    headline: fields.title,
    image: img?.images?.fallback?.src ? `${siteUrl}${img?.images?.fallback?.src}` : undefined,
    datePublished: new Date(fields.date).toISOString(),
  };
};

export const makeBlogPosting = (siteUrl: string, data: ArticleSourceData): BlogPosting => ({
  ...makeArticle(siteUrl, data),
  '@type': `BlogPosting`,
});

export const makeBlog = (
  siteUrl: string,
  subPage: string,
  articles: Array<ArticleSourceData>,
): Blog => ({
  '@type': `Blog`,
  blogPost: articles.map((article) => makeBlogPosting(siteUrl, article)),
  mainEntityOfPage: {
    '@type': `WebPage`,
    url: `${siteUrl}/${subPage}`,
  },
  author: [
    ...new Set([
      ...articles.map(({ frontmatter }) => jsonStringifySorted(frontmatter?.author || ``)),
    ]).values(),
  ]
    .filter((s) => s !== ``)
    .map((s) => {
      const d = JSON.parse(s);
      return makePerson(d);
    }),
});

const walk = (n: any, f: (k: string, node: any) => void, key: string = `_`) => {
  if (typeof n === `object`) {
    if (`@type` in n) {
      f(key, n);
    }
    Object.entries(n).forEach(([k, v]) => walk(v, f, `${key}.${k}`));
  } else if (Array.isArray(n)) {
    n.forEach((v, i) => walk(v, f, `${key}.${i}`));
  }
};

export const makeRoot = <V extends Thing>(root: V): WithContext<V> => {
  const fullData = {
    '@context': `http://schema.org/`,
    ...(root as object),
  } as any as WithContext<V>;
  const seenTimes: { [obj: string]: number } = {};
  walk(fullData, (k, n) => {
    if (k !== `_`) {
      const v = jsonStringifySorted(n);
      seenTimes[v] = (seenTimes[v] || 0) + 1;
    }
  });
  let currentId = 0;
  const ids: { [obj: string]: string } = {};
  walk(fullData, (k, n) => {
    if (k !== `_`) {
      const v = jsonStringifySorted(n);
      if (seenTimes[v] > 1) {
        if (!(v in ids)) {
          ids[v] = `${k}${currentId}`;
          currentId += 1;
          // eslint-disable-next-line no-param-reassign
          n[`@id`] = ids[v];
        } else {
          // eslint-disable-next-line no-param-reassign
          Object.keys(n).forEach((key) => delete n[key]);
          // eslint-disable-next-line no-param-reassign
          n[`@id`] = ids[v];
        }
      }
    }
  });
  return fullData;
};
