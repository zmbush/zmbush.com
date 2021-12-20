import { graphql, Link } from 'gatsby';
import * as React from 'react';

import { BlogListQuery } from '../../types/graphql-types';
import Default from '../components/default';

interface Props {
  data: BlogListQuery;
}
const BlogPage = ({ data }: Props) => (
  <Default
    article
    pageTitle='My Blog Posts'
    headerImg={data.allMdx.nodes[0].frontmatter?.headerImg}
  >
    <p>My posts will go here! </p>
    {data.allMdx.nodes.map((node) => (
      <article key={node.id}>
        <h2>{node.fields.title}</h2>
        <p>Posted: {node.fields.date}</p>
        <Link to={`/blog/${node.fields.slug}`}>Here</Link>
      </article>
    ))}
  </Default>
);

export const query = graphql`
  query BlogList {
    allMdx(
      sort: { fields: fields___timestamp, order: DESC }
      filter: { frontmatter: { draft: { ne: true } }, fields: { source: { eq: "blog" } } }
    ) {
      nodes {
        frontmatter {
          headerImg: heroImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
        fields {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        body
      }
    }
  }
`;

export default BlogPage;
