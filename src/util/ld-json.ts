/* eslint-disable max-classes-per-file */
import { getImage } from 'gatsby-plugin-image';
import React from 'react';

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

type V<T> = T | Array<T>;

class Node<Fields> {
  name: string = `UNSET`;

  protected d: Fields;

  constructor(data: Fields) {
    this.d = data;
  }

  get innerData() {
    return this.d;
  }

  private static walk(key: string, n: any, f: (k: string, node: any) => void) {
    if (typeof n === `object`) {
      if (`@type` in n) {
        f(key, n);
      }
      Object.entries(n).forEach(([k, v]) => this.walk(`${key}.${k}`, v, f));
    } else if (Array.isArray(n)) {
      n.forEach((v, i) => this.walk(`${key}.${i}`, v, f));
    }
  }

  rootData() {
    const fullData = {
      '@context': `http://schema.org/`,
      ...this.data(),
    };
    const seenTimes: { [obj: string]: number } = {};
    Node.walk(``, fullData, (k, n) => {
      if (k !== ``) {
        const v = jsonStringifySorted(n);
        seenTimes[v] = (seenTimes[v] || 0) + 1;
      }
    });
    let currentId = 0;
    const ids: { [obj: string]: string } = {};
    Node.walk(`_`, fullData, (k, n) => {
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
  }

  private static resolveData(v: any): any {
    let out = v;
    if (typeof v === `object` && v instanceof Node) {
      out = v.data();
    } else if (Array.isArray(v)) {
      out = v.map(this.resolveData);
    }
    return out;
  }

  data() {
    return {
      '@type': this.name,
      ...Object.fromEntries(Object.entries(this.d).map(([k, v]) => [k, Node.resolveData(v)])),
    };
  }

  render() {
    return React.createElement(
      `script`,
      { type: `application/ld+json` },
      JSON.stringify(this.rootData(), null, 2),
    );
  }
}

interface WebPageData {
  [`@id`]?: string;
}
export class WebPage extends Node<WebPageData> {
  name: string = `WebPage`;
}

type PersonSourceData = {
  name: string;
  url: string;
};
interface PersonData {
  name?: V<string>;
  url?: V<string>;
}
export class Person extends Node<PersonData> {
  name: string = `Person`;

  static fromData({ name, url }: PersonSourceData): Person {
    return new Person({ name, url });
  }
}

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

interface ArticleData {
  mainEntityOfPage?: V<WebPage>;
  author?: V<Person>;
  headline?: V<string>;
  image?: V<string>;
  datePublished?: V<Date>;
}
export class Article extends Node<ArticleData> {
  name: string = `Article`;

  static fromData(siteUrl: string, { frontmatter, fields }: ArticleSourceData): Article {
    const img = getImage(frontmatter?.heroImage?.childImageSharp?.gatsbyImageData);
    return new Article({
      mainEntityOfPage: new WebPage({
        '@id': `${siteUrl}/${fields.source}/${fields.slug}`,
      }),
      author: frontmatter?.author ? Person.fromData(frontmatter.author) : undefined,
      headline: fields.title,
      image: img?.images?.fallback?.src ? `${siteUrl}${img?.images?.fallback?.src}` : undefined,
      datePublished: fields.date,
    });
  }
}

class BlogPosting extends Article {
  name: string = `BlogPosting`;

  static fromData(siteUrl: string, sourceData: ArticleSourceData): BlogPosting {
    return new BlogPosting(Article.fromData(siteUrl, sourceData).innerData);
  }
}

interface BlogData {
  blogPost?: V<BlogPosting>;
  author?: V<Person>;
  mainEntityOfPage?: V<WebPage>;
}
export class Blog extends Node<BlogData> {
  name: string = `Blog`;

  static fromData(siteUrl: string, subPage: string, articles: Array<ArticleSourceData>): Blog {
    return new Blog({
      blogPost: articles.map((article) => BlogPosting.fromData(siteUrl, article)),
      mainEntityOfPage: new WebPage({
        '@id': `${siteUrl}/${subPage}`,
      }),
      author: [
        ...new Set([
          ...articles.map(({ frontmatter }) => jsonStringifySorted(frontmatter?.author || ``)),
        ]).values(),
      ]
        .filter((s) => s !== ``)
        .map((s) => {
          const d = JSON.parse(s);
          return Person.fromData(d);
        }),
    });
  }
}
