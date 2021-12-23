/* eslint-disable global-require */
module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.zmbush.com',
    title: 'zmbush.com',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: './src/data/',
      },
      __key: 'data',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
      __key: 'blog',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
      __key: 'projects',
    },
    'gatsby-plugin-mdx-source-name',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-33377926-1',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/zb-logo.svg',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        commonmark: true,
        rehypePlugins: [require('rehype-slug')],
        gatsbyRemarkPlugins: [
          'gatsby-remark-unwrap-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              showCaptions: true,
              tracedSVG: true,
              withWebp: true,
              withAvif: true,
            },
          },
          'gatsby-remark-embed-snippet',
          'gatsby-remark-prismjs',
          'gatsby-remark-unwrap-code', // local plugin to fix p/div/pre nesting issues
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-ts',
      options: {
        tsLoader: {
          logLevel: 'warn',
        },
        fileName: 'types/graphql-types.ts',
        codegen: true,
        codegenDelay: 250,
        typeCheck: false,
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.zmbush.com',
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-schema-snapshot`,
      options: {
        path: `schema.gql`,
        include: {
          types: ['Mdx', 'PartnerYaml'],
        },
        update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
      },
    },
  ],
};
