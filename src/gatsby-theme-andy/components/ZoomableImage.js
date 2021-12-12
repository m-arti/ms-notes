import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import React, { useMemo, useCallback, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";

const ZoomableImage = ({ src, zoomSrc, alt, ...rest }) => {
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

  // if (extension === "svg" || !childImageSharp) {
  //   return (
  //     <InnerImageZoom
  //       src={publicURL}
  //       zoomSrc={publicURL} {...rest}
  //     />
  //   );
  // };

  return (
    <div class='mt-4 pt-4'>
      <InnerImageZoom
        src={publicURL}
        zoomSrc={publicURL}
        alt={alt}
        moveType="drag"
        fadeDuration="50"
        hideCloseButton="false"
      />
    </div>
 );

};

ZoomableImage.propTypes = {
  src: PropTypes.string.isRequired,
  zoomSrc: PropTypes.string,
  alt: PropTypes.string,
};

export default ZoomableImage;
