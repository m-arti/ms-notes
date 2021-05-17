module.exports = {

  siteMetadata: {
    title: `Martins' Notes`,
    author: `Martins Samuel`,
    description: `Hello! I'm Martins. I'm a researcher and designer. This is an atlas of my musings.`,
    homepage: `https://notes.martinssamuel.com`,
    siteUrl: `https://notes.martinssamuel.com`,
  },

  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },

  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-fingerprints`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // gatsby-remark-images
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 100,
        quality: 100,
        showCaptions: true,
        markdownCaptions: true,
        withWebp: true,
      },
    },

    // gatsby-plugin-feed
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
                siteUrl
                site_url: siteUrl
                homepage
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allSitePage, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({},
                  edge.node.frontmatter,
                  {
                    description: edge.node.excerpt,
                    author: site.siteMetadata.author,
                    custom_elements: [{ "content:encoded": edge.node.html }],
                    url: site.siteMetadata.siteUrl + '/' + edge.node.parent.slug,
                  })
              })
            },
            query: `
              {
                allMarkdownRemark {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        tags
                      }
                      parent {
                        ... on BrainNote {
                          slug
                        }
                      }
                    }
                  }
                }

              }
            `,
            output: "/rss.xml",
            title: "Martins' Notes — RSS Feed",
          },
        ],
      },
    },

    // gatsby-plugin-sitemap
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/images'],
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
                siteUrl
                site_url: siteUrl
                homepage
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
      },
    },

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
        plugins: [
          // gatsby-remark-relative-images-v2 (must come before gatsby-remark-images)
          {
            resolve: `gatsby-remark-relative-images-v2`,
          },

          // gatsby-remark-images
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 100,
              quality: 100,
              showCaptions: true,
              markdownCaptions: true,
              withWebp: true,
            },
          },
        ],
      },
    },

    // gatsby-plugin-mdx
    {
      resolve: `gatsby-plugin-mdx`,

      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          `gatsby-remark-embedder`,

          // gatsby-remark-copy-linked-files
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [],
            },
          },

          // gatsby-remark-table-of-contents`
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 3,
              className: "table-of-contents"
            },
          },

          // gatsby-remark-autolink-headers`
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `0`,
              icon: false,
              className: `header-link`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h1`, `h2`, `h3`],
            },
          },

          // configure gatsby-remark-responsive-iframe
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.25rem`,
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
          {
            resolve: `gatsby-remark-smartypants`
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

          // gatsby-remark-jargon
          {
            resolve: 'gatsby-remark-jargon',
            options: {
              jargon: require('./jargon.js')
            }
          }
        ],
        remarkPlugins: [require(`remark-slug`), require(`remark-math`), require(`remark-html-katex`)]
      },
    },
  ],

};
