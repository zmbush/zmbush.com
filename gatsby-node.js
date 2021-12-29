const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const projectsTemplate = path.resolve(`src/templates/article.tsx`);
  const result = await graphql(`
    query {
      allMdx(filter: { fields: { source: { in: ["blog", "projects"] } } }) {
        nodes {
          id
          fields {
            source
            slug
          }
          frontmatter {
            draft
          }
        }
      }
    }
  `);

  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `${node.fields.source}${node.frontmatter.draft ? `/drafts` : ``}/${node.fields.slug}`,
      component: projectsTemplate,
      context: {
        id: node.id,
      },
    });
  });
};

const stringToSlug = (strIn) => {
  let str = strIn.replace(/^\s+|\s+$/g, ``); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const fr = `àáäâèéëêìíïîòóöôùúüûñç·_,:;`;
  const to = `aaaaeeeeiiiioooouuuunc-----`;
  for (let i = 0, l = fr.length; i < l; i += 1) {
    str = str.replace(new RegExp(fr.charAt(i), `g`), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -/]/g, ``) // remove invalid chars
    .replace(/\s+/g, `-`) // collapse whitespace and replace by -
    .replace(/-+/g, `-`); // collapse dashes

  return str;
};
const dateLikeSlugPrefix = /(\d{4})[-/](\d{2})[-/](\d{2})[-/](.*)/;
const dateInSlug = /(\d{4})\/(\d{2})\/(\d{2})/;
const titleInSlug = /\d{4}\/\d{2}\/\d{2}\/(.*)/;
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const fileNode = getNode(node.parent);

  if (node.internal.type === `Mdx` && fileNode.internal.type === `File`) {
    const parsedFilePath = path.parse(fileNode.relativePath);
    let slug;
    let date;
    let title;

    if (node.frontmatter) {
      if (node.frontmatter.date) {
        date = new Date(node.frontmatter.date);
      }
      if (node.frontmatter.title) {
        title = node.frontmatter.title;
      }
    }

    if (node.frontmatter && node.frontmatter.slug) {
      slug = node.frontmatter.slug;
    } else if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `${parsedFilePath.dir}/${parsedFilePath.name}`;
    } else if (parsedFilePath.dir === ``) {
      slug = `${parsedFilePath.name}`;
    } else {
      slug = `${parsedFilePath.dir}`;
    }

    {
      const m = slug.match(dateLikeSlugPrefix);
      if (m) {
        slug = `${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
      }
    }

    if (!date) {
      const m = slug.match(dateInSlug);
      if (m) {
        date = new Date(`${m[1]}-${m[2]}-${m[3]}`);
      }
    }

    if (!title) {
      const m = slug.match(titleInSlug);
      if (m) {
        let _;
        [_, title] = m;
      }
    }

    createNodeField({
      name: `slug`,
      node,
      value: stringToSlug(slug),
    });

    if (!date) {
      date = new Date(`1999-01-01`);
    }

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
  }
};
