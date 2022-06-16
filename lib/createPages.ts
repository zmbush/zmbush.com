import { GatsbyNode } from 'gatsby';
import { resolve } from 'path';

const createPages: GatsbyNode[`createPages`] = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const projectsTemplate = resolve(`src/templates/article.tsx`);
  const result = await graphql<{
    allMdx: {
      nodes: Array<{
        id: string;
        fields: { slug?: string | null };
        frontmatter?: { draft?: boolean | null } | null;
      }>;
    };
  }>(`
    query GetBlogPages {
      allMdx(filter: { fields: { category: { in: ["blog", "projects"] } } }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            draft
          }
        }
      }
    }
  `);

  if (!result.data) {
    return;
  }

  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `${node.frontmatter?.draft ? `drafts` : ``}/${node.fields.slug}`,
      component: projectsTemplate,
      context: {
        id: node.id,
      },
    });
  });
};

export default createPages;
