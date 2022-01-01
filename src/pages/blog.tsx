import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { helmetJsonLdProp } from 'react-schemaorg';
import { Blog } from 'schema-dts';

import { BlogListQuery } from '../../types/graphql-types';
import Article from '../components/core/article';
import getSiteMetadata from '../util/get-site-metadata';
import { makeBlog, makeRoot } from '../util/ld-json';

interface Props {
  data: BlogListQuery;
}
const BlogPage = ({ data }: Props) => (
  <Article pageTitle='My Blog Posts' headerImg={data.allMdx.nodes[0].frontmatter?.headerImg}>
    <Helmet
      script={[
        helmetJsonLdProp<Blog>(
          makeRoot(
            makeBlog(
              getSiteMetadata().siteUrl!,
              `blogs`,
              data.allMdx.nodes.map((d) => ({
                ...d,
                frontmatter: {
                  ...d.frontmatter,
                  heroImage: d.frontmatter?.headerImg,
                },
              })),
            ),
          ),
        ),
      ]}
    />
    <p>My posts will go here! </p>
    {data.allMdx.nodes.map((node) => (
      <article key={node.id}>
        <h2>{node.fields.title}</h2>
        <p>Posted: {node.fields.date}</p>
        <Link to={`/${node.fields.slug}`}>Here</Link>
      </article>
    ))}
  </Article>
);

export const query = graphql`
  query BlogList {
    allMdx(
      sort: { fields: fields___timestamp, order: DESC }
      filter: { frontmatter: { draft: { ne: true } }, fields: { category: { eq: "blog" } } }
    ) {
      nodes {
        frontmatter {
          headerImg: heroImage {
            childImageSharp {
              gatsbyImageData
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
