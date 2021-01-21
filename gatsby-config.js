module.exports = {
  siteMetadata: {
    title: `Martins' Notes`,
    description: `Hello! I'm Martins. I'm a researcher and designer. This is a mélange of my musings.`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // gatsby-theme-andy
    {
      resolve: `gatsby-theme-andy`,
      options: {
        hideDoubleBrackets: true,
        mdxOtherwiseConfigured: true,
      },
    },

    // gatsby-transformer-remark
    {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-responsive-iframe`],
    },
  },

    // gatsby-plugin-mdx
    {
      resolve: `gatsby-plugin-mdx`,

      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          `gatsby-remark-embedder`,

          // gatsby-remark-images
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },

          // gatsby-remark-external-links
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer',
            },
          },

          // gatsby-remark-katex
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
              displayMode: `true`,
              output: `htmlAndMathml`,
            }
          },
        ],
        remarkPlugins: [require(`remark-slug`), require("remark-math"), require("remark-html-katex")]
      },
    }
  ],
};
