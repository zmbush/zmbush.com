import { graphql, useStaticQuery } from 'gatsby';

import { GetSiteMetadataQuery } from '../../types/graphql-types';

const getSiteMetadata = () =>
  useStaticQuery<GetSiteMetadataQuery>(graphql`
    query GetSiteMetadata {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `).site?.siteMetadata || {};

export default getSiteMetadata;
