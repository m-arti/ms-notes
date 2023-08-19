const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` && node.internal.type.toLowerCase() === 'mdx' && node.fileAbsolutePath) {
    const slug = createFilePath({ node, getNode, basePath: `content` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }

  if (node.internal.type === "JupyterNotebook") {
    const slug = createFilePath({ node, getNode, basePath: `notebooks/**` })
    createNodeField({
      node,
      name: `slug`,
      value: node.json.metadata.title
        .split(" ")
        .map(token => token.toLowerCase())
        .join("-"),
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

const path = require(`path`);
