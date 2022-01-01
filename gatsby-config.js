/* eslint-disable global-require */
const fsSource = (name, pathIn) => {
  let path = name;
  if (pathIn) {
    path = pathIn;
  }
  return {
    resolve: `gatsby-source-filesystem`,
    options: {
      name,
      path: `./src/${path}`,
    },
    __key: name,
  };
};

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.zmbush.com`,
    title: `zmbush.com`,
  },
  plugins: [
    fsSource(`images`),
    fsSource(`pages`),
    fsSource(`data`),
    fsSource(`content`),

    `gatsby-plugin-image`,
    `gatsby-plugin-mdx-source-name`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-33377926-1`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/zb-logo.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: process.env.NODE_ENV === `production` ? [`auto`, `webp`, `avif`] : [`auto`],
          placeholder: `blurred`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        commonmark: true,
        defaultLayouts: {
          default: require.resolve(`./src/components/layouts/default.tsx`),
        },
        rehypePlugins: [require(`rehype-slug`)],
        gatsbyRemarkPlugins: [
          `gatsby-remark-unwrap-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              showCaptions: true,
              tracedSVG: true,
              withWebp: true,
              withAvif: true,
            },
          },
          `gatsby-remark-embed-snippet`,
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-ts`,
      options: {
        tsLoader: {
          logLevel: `warn`,
        },
        fileName: `types/graphql-types.ts`,
        codegen: true,
        codegenDelay: 250,
        typeCheck: false,
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.zmbush.com`,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-schema-snapshot`,
      options: {
        path: `schema.gql`,
        include: {
          types: [`Mdx`, `PartnerYaml`, `TechnologyYaml`, `OrganizationYaml`],
        },
        update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
      },
    },
    `gatsby-plugin-react-svg`,
  ],
};
