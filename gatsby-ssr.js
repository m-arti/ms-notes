const React = require("react")
const BrainNote = require("./src/gatsby-theme-andy/components/BrainNote")
// Adds a class name to the body element
exports.onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
  setBodyAttributes({
    className: "NotebookEmbed",
  })
}
// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  return <BrainNote {...props}>{element}</BrainNote>
}
