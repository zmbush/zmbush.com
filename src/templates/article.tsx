import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';

import { SingleBlogPostQuery } from '../../types/graphql-types';
import Default from '../components/core/default';

const ExtraLinks = ({
  partners,
  siteUrl,
  siteName,
  siteMsg,
  sourceUrl,
}: NonNullable<NonNullable<SingleBlogPostQuery['mdx']>['frontmatter']>) => (
  <>
    {siteUrl ? (
      <p>
        {siteMsg || 'You can see it in action'} {siteName ? 'at: ' : null}
        <a href={siteUrl}>{siteName || 'here'}</a>.
      </p>
    ) : null}
    {partners ? (
      <p>
        I built this project with{' '}
        {partners.map((partner, i) => (
          <React.Fragment key={partner.ref}>
            {partners.length > 1 && i === partners.length - 1 ? ' and ' : null}
            <a href={partner.url}>{partner.name}</a>
            {i === partners.length - 1 ? '.' : null}
            {partners.length > 2 && i !== partners.length - 1 ? ',' : null}
          </React.Fragment>
        ))}
      </p>
    ) : null}
    {sourceUrl ? (
      <p>
        You can view the code for this project <a href={sourceUrl}>here</a>.
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
  const { frontmatter, body, headings, fields } = data.mdx;
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
      <MDXRenderer headings={headings}>{body}</MDXRenderer>
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
          ref
          name
          url
        }
        sourceUrl
        siteUrl
        siteName
        siteMsg
      }
      fields {
        title
        date(formatString: "MMMM D, YYYY")
        source
      }
      body
      headings {
        depth
        value
      }
    }
  }
`;

export default BlogPost;
