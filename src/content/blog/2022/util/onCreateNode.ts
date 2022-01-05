import { Node, GatsbyNode } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { parse } from 'path';

type Frontmatter = {
  title?: string | null;
  date?: Date | null;
  slug?: string | null;
  subtitle?: string | null;
  draft?: boolean | null;
  sourceUrl?: string | null;
  siteUrl?: string | null;
  siteName?: string | null;
  siteMsg?: string | null;
  category?: string | null;
};

type MdxNode = {
  rawBody: string;
  fileAbsolutePath: string;
  frontmatter?: Frontmatter | null;
  slug?: string | null;
  body: string;
  html?: string | null;
  mdxAST: JSON;
  tableOfContents(maxDepth: number): JSON;
  timeToRead: number;
} & Node;

const stringToSlug = (strIn: string) => {
  let str = strIn.replace(/^\s+|\s+$/g, ``); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const f = `àáäâèéëêìíïîòóöôùúüûñç·_,:;`;
  const t = `aaaaeeeeiiiioooouuuunc-----`;
  for (let i = 0, l = f.length; i < l; i += 1) {
    str = str.replace(new RegExp(f.charAt(i), `g`), t.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -/]/g, ``) // remove invalid chars
    .replace(/\s+/g, `-`) // collapse whitespace and replace by -
    .replace(/-+/g, `-`); // collapse dashes

  return str;
};

const onCreateNode: GatsbyNode[`onCreateNode`] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const parentNode = node.parent ? getNode(node.parent) : undefined;

  if (node.internal.type === `Mdx` && parentNode && parentNode.internal.type === `File`) {
    const mdxNode = node as MdxNode;
    const fileNode = parentNode as FileSystemNode;

    // start-snippet{frontmatter}
    let date: Date | undefined;
    let title: string | undefined;

    if (mdxNode.frontmatter) {
      if (mdxNode.frontmatter.date) {
        date = new Date(mdxNode.frontmatter.date);
      }
      if (mdxNode.frontmatter.title) {
        title = mdxNode.frontmatter.title;
      }
    }
    // end-snippet{frontmatter}

    // start-snippet{constructSlug}
    let slug: string | undefined;

    const parsedFilePath = parse(fileNode.relativePath);
    if (mdxNode.frontmatter && mdxNode.frontmatter.slug) {
      slug = mdxNode.frontmatter.slug;
    } else if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `${parsedFilePath.dir}/${parsedFilePath.name}`;
    } else if (parsedFilePath.dir === ``) {
      slug = `${parsedFilePath.name}`;
    } else {
      slug = `${parsedFilePath.dir}`;
    }
    // end-snippet{constructSlug}

    {
      // start-snippet{formatPath}
      const m = slug.match(/([^-/]*)\/(\d{4})[-/](\d{1,2})[-/](\d{1,2})[-/](.*)/);
      if (m) {
        slug = `${m[1]}/${m[2]}/${m[3].padStart(2, `0`)}/${m[4].padStart(2, `0`)}/${m[5]}`;
      }
      // end-snippet{formatPath}
    }

    // start-snippet{readDate}
    if (!date) {
      const m = slug.match(/[^-/]*\/(\d{4})\/(\d{2})\/(\d{2})/);
      if (m) {
        date = new Date(`${m[1]}-${m[2]}-${m[3]}`);
      } else {
        date = new Date(`1999-01-01`);
      }
    }
    // end-snippet{readDate}

    // start-snippet{readTitle}
    if (!title) {
      const m = slug.match(/[^-/]*\/\d{4}\/\d{2}\/\d{2}\/(.*)/);
      if (m) {
        [, title] = m;
      }
    }
    // end-snippet{readTitle}

    // start-snippet{makeFields}
    createNodeField({
      name: `slug`,
      node,
      value: stringToSlug(slug),
    });

    createNodeField({
      name: `date`,
      node,
      value: date,
    });

    createNodeField({
      name: `timestamp`,
      node,
      value: Math.round(date.getTime() / 1000),
    });

    createNodeField({
      name: `title`,
      node,
      value: title || `NO TITLE`,
    });
    // end-snippet{makeFields}
  }
};

export default onCreateNode;
