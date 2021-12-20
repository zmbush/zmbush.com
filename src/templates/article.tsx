import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';

import { SingleBlogPostQuery } from '../../types/graphql-types';
import Default from '../components/default';

const ExtraLinks = ({
  partners,
  siteUrl,
  siteName,
  sourceUrl,
}: NonNullable<NonNullable<SingleBlogPostQuery['mdx']>['frontmatter']>) => (
  <>
    {partners ? (
      <p>
        I built this project with{' '}
        {partners.map((partner, i) => (
          <>
            {partners.length > 1 && i === partners.length - 1 ? ' and ' : null}
            <Link to={partner.url}>{partner.name}</Link>
            {i === partners.length - 1 ? '.' : null}
            {partners.length > 2 && i !== partners.length - 1 ? ',' : null}
          </>
        ))}
      </p>
    ) : null}
    {siteUrl ? (
      <p>
        You can see it in action {siteName ? 'at: ' : null}
        <Link to={siteUrl}>{siteName || 'here'}</Link>.
      </p>
    ) : null}
    {sourceUrl ? (
      <p>
        You can view the code for this project <Link to={sourceUrl}>here</Link>.
      </p>
    ) : null}
  </>
);

interface Props {
  data: SingleBlogPostQuery;
}

const templates: { [name: string]: typeof Default } = {
  blog: Default,
  projects: Default,
};

const BlogPost = ({ data }: Props) => {
  if (!data.mdx || !data.mdx.frontmatter || !data.mdx.body) {
    return (
      <Default article pageTitle='ERROR'>
        Unable to render blog post. Expected data is not present.
      </Default>
    );
  }
  const { frontmatter, body, fields } = data.mdx;
  let Component = templates.blog;
  if (fields && fields.source && fields.source in templates) {
    Component = templates[fields.source];
  }
  return (
    <Component
      article
      pageTitle={fields.title}
      subtitle={frontmatter.subtitle || undefined}
      date={fields.date}
      headerImg={frontmatter.heroImage}
    >
      <MDXRenderer>{body}</MDXRenderer>
      <ExtraLinks {...frontmatter} />
    </Component>
  );
};

export const query = graphql`
  query SingleBlogPost($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        subtitle
        draft
        heroImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        partners {
          name
          url
        }
        sourceUrl
        siteUrl
        siteName
      }
      fields {
        title
        date(formatString: "MMMM D, YYYY")
        source
      }
      body
    }
  }
`;

export default BlogPost;
