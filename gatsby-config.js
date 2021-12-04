const path = require(`path`);
require('dotenv').config();

module.exports = {

  siteMetadata: {
    title: `Martins' Notes`,
    author: `Martins Samuel`,
    description: `Hi, I'm Martins. I'm do AI research and design. This is an atlas of my musings. I use this medium for iterating through ideas on topics such as computation, art and literature, which presently are my most fond of interests. You may also find quotes, draft essays and poems.`,
    homepage: `https://notes.martinssamuel.com`,
    siteUrl: `https://notes.martinssamuel.com`,
  },

  flags: {
    DEV_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
    PARALLEL_SOURCING: true,
    QUERY_ON_DEMAND: true,
    LAZY_IMAGES: true,
    FAST_REFRESH: true,
  },

  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-fingerprints`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-inline-svg`,

    // gatsby-plugin-algolia
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      },
    },

    // gatsby-source-filesystem
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `assets`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `content`),
      },
    },

    // gatsby-transformer-gitinfo
    {
      resolve: `gatsby-transformer-gitinfo`,
      options: {
        include: /\.mdx$/i,
      },
    },

    // gatsby-plugin-google-fonts
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter`,
          `Caveat\:400,500,600`,
          `Herr Von Muellerhoff`,
          `Mr De Haviland`,
          `Mrs Saint Delafield`
        ],
        display: 'swap'
      }
    },

    // gatsby-plugin-react-svg
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\.svg$/i,
        }
      }
    },

    // gatsby-plugin-sharp
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `tracedSVG`,
          quality: 100,
          backgroundColor: `transparent`,
          transformOptions: {grayscale: false},
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },

    `gatsby-transformer-sharp`,

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
        setup: ({
          query: {
            site: { siteMetadata },
          },
          ...rest
        }) => {
          siteMetadata.feed_url = siteMetadata.siteUrl + '/rss.xml';
          siteMetadata.image_url =
            siteMetadata.siteUrl + '/icons/icon-512x512.png';
          const siteMetadataModified = siteMetadata;
          siteMetadataModified.feed_url = `${siteMetadata.siteUrl}/rss.xml`;
          siteMetadataModified.image_url = `${siteMetadata.siteUrl}/icons/icon-512x512.png`;

          return {
            ...siteMetadataModified,
            ...rest,
          };
        },
        feeds: [
          {
            serialize: ({ query: { site, allSitePage, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({},
                  edge.node.frontmatter,
                  {
                    description: edge.node.excerpt,
                    date: edge.node.date,
                    author: site.siteMetadata.author,
                    custom_elements: [{ "content:encoded": edge.node.html }],
                    url: site.siteMetadata.siteUrl + '/' + edge.node.parent.slug,
                    guid: site.siteMetadata.siteUrl + '/' + edge.node.parent.slug,
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
            title: "Martins Samuel — Notes RSS Feed",
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
        name: `Martins Samuel — Notes`,
        short_name: `Martins Samuel — Notes`,
        description: `Hi, I'm Martins. I'm a researcher and designer. This is an atlas of my musings.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000`,
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
        rssTitle: `Martins Samuel — Notes RSS Feed`,
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

    // gatsby-plugin-flexsearch
    {
      resolve: 'gatsby-plugin-flexsearch',
      options: {
        type: "MarkdownRemark",
        languages: ['en'],
        encode: 'icase',
        fields: [
          {
            name: 'title',
            indexed: true,
            store: true,
            resolver: 'frontmatter.title',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 6,
              depth: 3,
            },
          },

          {
            name: 'tags',
            indexed: true,
            store: true,
            resolver: 'frontmatter.tags',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 6,
              depth: 3,
            },
          },

          {
            name: 'excerpt',
            indexed: true,
            store: true,
            resolver: 'excerpt',
            attributes: {
              encode: 'balance',
              tokenize: 'full',
              threshold: 6,
              depth: 3,
            },
          },

          {
            name: 'url',
            indexed: true,
            store: true,
            resolver: 'fields.slug'
          },
        ],
      },
    },

  ],

};
