import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import * as React from 'react';

import { ProjectListQuery } from '../../types/graphql-types';
import Default from '../components/default';
import { down, up } from '../util/mediaQueries';

const ProjectSection = styled.section`
  &:not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
  ${down('sm')} {
    .gatsby-image-wrapper {
      display: none;
    }
    padding: 10px;
  }
  ${up('sm')} {
    display: flex;
    &:nth-of-type(2n) {
      flex-direction: row-reverse;
    }

    p {
      align-self: center;
    }

    .content {
      padding: 30px;
      flex 1;
    }
  }
`;

const ExtraLinks = ({
  partners,
  siteUrl,
  siteName,
  sourceUrl,
}: NonNullable<ProjectListQuery['allMdx']['nodes'][0]['frontmatter']>) => (
  <>
    {partners ? (
      <>
        Partner{partners.length > 1 ? 's' : ''}:{' '}
        {partners.map((partner, i) => (
          <React.Fragment key={partner.ref}>
            {partners.length > 1 && i === partners.length - 1 ? ' and ' : null}
            <a href={partner.url}>{partner.name}</a>
            {partners.length > 2 && i !== partners.length - 1 ? ', ' : null}
          </React.Fragment>
        ))}
      </>
    ) : null}
    {partners && siteUrl ? ' | ' : null}
    {siteUrl ? (
      <>
        Live Site: <a href={siteUrl}>{siteName || 'here'}</a>
      </>
    ) : null}
    {(partners || siteUrl) && sourceUrl ? ' | ' : null}
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
  >
    {data.allMdx.nodes.map((node) => {
      const frontmatter = node.frontmatter!;
      const img = getImage(frontmatter.thumbnail as ImageDataLike);
      return (
        <ProjectSection key={node.id}>
          {img ? <GatsbyImage image={img} alt={node.fields.title} /> : null}
          <div className='content'>
            <Link to={`/projects/${node.fields.slug}`}>
              <div className='post-title'>
                <h2>{node.fields.title}</h2>
              </div>
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
              gatsbyImageData(height: 200, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          headerImg: heroImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          siteUrl
          siteName
          sourceUrl
          partners {
            ref
            name
            url
          }
        }
        id
        body
        excerpt
        fields {
          slug
          date(formatString: "MMMM D, YYYY")
          title
        }
      }
    }
  }
`;

export default ProjectsPage;
