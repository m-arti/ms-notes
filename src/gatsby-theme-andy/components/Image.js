import React, { useMemo, useCallback, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";

const Image = ({ src, ...rest }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile (
        filter: {
          internal: {
            mediaType: { regex: "/image/" }
          }
        }
      ) {
        edges {
          node {
            absolutePath
            relativePath
            extension
            publicURL
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  `);

  const match = useMemo(
    () => data.images.edges.find(({ node }) => src === node.relativePath),
    [data, src]
  );

  if (!match) return null;

  const {
    node: { childImageSharp, publicURL, extension } = {}
  } = match;

  if (extension === "svg" || !childImageSharp) {
    return (
      <GatsbyImage src={publicURL} {...rest} />
    );
  };

  return (
    <GatsbyImage
      class="my-2 py-2 rounded-lg"
      image = {childImageSharp.gatsbyImageData} {...rest}
    />
 );

};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Image;
