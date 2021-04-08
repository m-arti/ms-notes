module.exports = {
  siteMetadata: {
    title: `Martins' Notes`,
    author: `Martins Samuel`,
    description: `Hello! I'm Martins. I'm a researcher and designer. This is an atlas of my musings.`,
    homepage: `https://notes.martinssamuel.com`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-remove-fingerprints`,

    // gatsby-plugin-manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Martins' Notes`,
        short_name: `Martins' Notes`,
        description: `Hello! I'm Martins. I'm a researcher and designer. This is an atlas of my musings.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },

    // gatsby-theme-andy
    {
      resolve: `gatsby-theme-andy`,
      options: {
        hideDoubleBrackets: true,
        mdxOtherwiseConfigured: true,
        generateRSS: true,
        rssTitle: `Martins' Notes`,
      },
    },

    // gatsby-transformer-remark
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
    },

    // gatsby-plugin-mdx
    {
      resolve: `gatsby-plugin-mdx`,

      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          `gatsby-remark-embedder`,

          //`gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,

          // configure gatsby-remark-responsive-iframe
          {
            resolve: `gatsby-remark-responsive-iframe`,
              options: {
                wrapperStyle: `margin-bottom: 1.25rem`,
              },
          },

          // gatsby-remark-images
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 545,
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

          // gatsby-remark-smartypants
          { resolve: `gatsby-remark-smartypants` },

          // gatsby-remark-katex
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
              displayMode: `true`,
              output: `htmlAndMathml`,
            }
          },

          // gatsby-remark-jargon
          {
            resolve: 'gatsby-remark-jargon',
            options: {
              jargon: require('./jargon.js')
            }
          }
        ],
        remarkPlugins: [require(`remark-slug`), require("remark-math"), require("remark-html-katex")]
      },
    },
  ],
};
