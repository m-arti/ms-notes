const escapeStringRegexp = require("escape-string-regexp")

const pagePath = `content`
const indexName = `ms-notes`

const pageQuery = `{
  pages:
  allMarkdownRemark {
    edges {
      node {
        id
        excerpt(pruneLength: 5000)
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
}`

function pageToAlgoliaRecord({ node: { id, frontmatter, parent, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...parent,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
