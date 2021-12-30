import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { SingleBlogPostQuery } from '../../types/graphql-types';
import Article from '../components/core/article';
import TechIcon from '../components/shortcodes/tech-icon';
import getSiteMetadata from '../util/get-site-metadata';

const ExtraLinks = ({
  partners,
  siteUrl,
  siteName,
  siteMsg,
  sourceUrl,
}: NonNullable<NonNullable<SingleBlogPostQuery[`mdx`]>[`frontmatter`]>) => (
  <>
    {siteUrl ? (
      <p>
        {siteMsg || `You can see it in action`} {siteName ? `at: ` : null}
        <a href={siteUrl}>{siteName || `here`}</a>.
      </p>
    ) : null}
    {partners ? (
      <p>
        I built this project with{` `}
        {partners.map((partner, i) => (
          <React.Fragment key={partner.ref}>
            {partners.length > 1 && i === partners.length - 1 ? ` and ` : null}
            <a href={partner.url}>{partner.name}</a>
            {i === partners.length - 1 ? `.` : null}
            {partners.length > 2 && i !== partners.length - 1 ? `,` : null}
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

const templates: { [name: string]: typeof Article } = {
  blog: Article,
  projects: Article,
};

const BlogPost = ({ data }: Props) => {
  const { siteUrl } = getSiteMetadata();
  if (!data.mdx || !data.mdx.frontmatter || !data.mdx.body) {
    return (
      <>
        <Article pageTitle='ERROR'>
          Unable to render blog post. Expected data is not present.
        </Article>
        <code className='language-json'>{JSON.stringify(data, null, 2)}</code>
      </>
    );
  }
  const { frontmatter, body, headings, fields } = data.mdx;
  let Component = templates.blog;
  if (fields && fields.source && fields.source in templates) {
    Component = templates[fields.source];
  }
  const img = getImage(frontmatter.heroImage?.childImageSharp?.gatsbyImageData);
  const pageData = {
    '@context': `http://schema.org/`,
    '@type': `Article`,
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': `${siteUrl}/${fields.source}/${fields.slug}`,
    },
    author: {
      '@type': `Person`,
      name: `Zach Bush`,
      url: siteUrl,
    },
    headline: fields.title,
    image: `${siteUrl}${img?.images?.sources?.at(0)?.srcSet.split(` `)[0]}`,
    datePublished: fields.date,
  };
  return (
    <>
      <Helmet>
        <script type='application/ld+json'>{JSON.stringify(pageData, null, 2)}</script>
      </Helmet>
      <Component
        pageTitle={fields.title}
        subtitle={frontmatter.subtitle || undefined}
        technologies={
          <>
            {(frontmatter.technologies || []).map((t) => (
              <TechIcon key={t.ref} refName={t.ref} />
            ))}
          </>
        }
        date={fields.date}
        headerImg={frontmatter.heroImage}
        headerImgAlign={frontmatter.heroImageAlign || undefined}
      >
        <MDXRenderer headings={headings}>{body}</MDXRenderer>
        <ExtraLinks {...frontmatter} />
      </Component>
    </>
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
            gatsbyImageData
          }
        }
        heroImageAlign
        partners {
          ref
          name
          url
        }
        technologies {
          ref
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
        slug
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
