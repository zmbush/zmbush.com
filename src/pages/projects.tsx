/* @jsx jsx */
import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ProjectListQuery } from '../../types/graphql-types';
import Default from '../components/core/default';
import TechIcon from '../components/shortcodes/tech-icon';
import { jsx, css } from '../util/emotionReact';
import getSiteMetadata from '../util/get-site-metadata';
import { Blog } from '../util/ld-json';
import theme from '../util/theme';

const ProjectSection = styled.section`
  &:not(:last-child) {
    border-bottom: 0.1rem solid ${theme.colors.divider};
  }
  ${theme.breakpoints.down(`sm`)} {
    .gatsby-image-wrapper {
      display: none;
    }
    padding: 1rem;
  }
  ${theme.breakpoints.up(`sm`)} {
    display: flex;
    &:nth-of-type(2n) {
      flex-direction: row-reverse;
    }

    p {
      align-self: center;
    }

    .content {
      padding: 3rem;
      flex-grow: 1;
    }
  }
`;

const ExtraLinks = ({
  partners,
  siteUrl,
  siteName,
  sourceUrl,
}: NonNullable<ProjectListQuery[`allMdx`][`nodes`][0][`frontmatter`]>) => (
  <>
    {partners ? (
      <>
        Partner{partners.length > 1 ? `s` : ``}:{` `}
        {partners.map((partner, i) => (
          <React.Fragment key={partner.ref}>
            {partners.length > 1 && i === partners.length - 1 ? ` and ` : null}
            <a href={partner.url}>{partner.name}</a>
            {partners.length > 2 && i !== partners.length - 1 ? `, ` : null}
          </React.Fragment>
        ))}
      </>
    ) : null}
    {partners && siteUrl ? ` | ` : null}
    {siteUrl ? (
      <>
        Live Site: <a href={siteUrl}>{siteName || `here`}</a>
      </>
    ) : null}
    {(partners || siteUrl) && sourceUrl ? ` | ` : null}
    {sourceUrl ? (
      <>
        Source Code: <a href={sourceUrl}>here</a>
      </>
    ) : null}
  </>
);

interface Props {
  data: ProjectListQuery;
}
const ProjectsPage = ({ data }: Props) => (
  <Default
    pageTitle='Projects'
    headerImg={data.allMdx.nodes.find((n) => n.frontmatter?.headerImg)?.frontmatter?.headerImg}
    headerImgAlign={
      data.allMdx.nodes.find((n) => n.frontmatter?.headerImg)?.frontmatter?.heroImageAlign ||
      undefined
    }
    css={css`
      ${theme.breakpoints.up(`xl`)} {
        max-width: 140rem;
        border: 0.1rem solid ${theme.colors.divider};
        border-top: none;
        margin: 0 auto;
      }
    `}
  >
    <Helmet>
      {Blog.fromData(
        getSiteMetadata().siteUrl!,
        `projects`,
        data.allMdx.nodes.map((d) => ({
          ...d,
          frontmatter: {
            ...d.frontmatter,
            heroImage: d.frontmatter?.headerImg,
          },
        })),
      ).render()}
      <meta
        name='description'
        content='All of the projects that Zach has worked on over the years.'
      />
    </Helmet>
    {data.allMdx.nodes.map((node) => {
      const frontmatter = node.frontmatter!;
      const img = getImage(frontmatter.thumbnail as ImageDataLike);
      return (
        <ProjectSection key={node.id}>
          {img ? <GatsbyImage image={img} alt={node.fields.title} /> : null}
          <div className='content'>
            <div
              className='post-title'
              css={css`
                display: flex;
                > * {
                  flex-grow: 0;
                }
              `}
            >
              <Link to={`/projects/${node.fields.slug}`}>
                <h2>{node.fields.title}</h2>
              </Link>
              <div
                css={css`
                  flex-grow: 1;
                `}
              />
              <span
                css={css`
                  color: black;
                  margin-right: 1rem;
                  font-size: 2.5rem;
                  a {
                    color: black;
                  }
                  ${theme.breakpoints.down(`xs`)} {
                    display: none;
                  }
                `}
              >
                {(frontmatter.technologies || []).map((t) => (
                  <TechIcon key={t.ref} refName={t.ref} />
                ))}
              </span>
            </div>
            <Link to={`/projects/${node.fields.slug}`}>
              <div className='post-date'>{node.fields.date}</div>
            </Link>
            <div className='post-contents'>
              <p>{node.excerpt}</p>
              <ExtraLinks {...frontmatter} />
            </div>
          </div>
        </ProjectSection>
      );
    })}
  </Default>
);

export const query = graphql`
  query ProjectList {
    allMdx(
      sort: { fields: fields___timestamp, order: DESC }
      filter: { frontmatter: { draft: { ne: true } }, fields: { source: { eq: "projects" } } }
    ) {
      nodes {
        frontmatter {
          thumbnail: heroImage {
            childImageSharp {
              gatsbyImageData(height: 200)
            }
          }
          headerImg: heroImage {
            childImageSharp {
              gatsbyImageData
            }
          }
          author {
            name
            url
          }
          heroImageAlign
          siteUrl
          siteName
          sourceUrl
          partners {
            ref
            name
            url
          }
          technologies {
            ref
          }
        }
        id
        body
        excerpt
        fields {
          slug
          date(formatString: "MMMM D, YYYY")
          title
          source
        }
      }
    }
  }
`;

export default ProjectsPage;
