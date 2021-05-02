/* for graph visualisation (Copyright (c) 2020 Mathieu Dutour, from wolfr.am/VbLnqzx0) */

import { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useStackedPages } from "react-stacked-pages-hook";
import { generateGradientColors } from "./Gradient.js";

export const useGraphData = () => {
  const [stackedPages, navigate, highlight] = useStackedPages();
  const data = useStaticQuery(graphql`
    {
      allBrainNote {
        nodes {
          id
          title
          slug
          outboundReferenceNotes {
            id
            slug
            childMdx {
              parent {
                id
              }
            }
          }
        }
      }
    }
  `);

  const [nodesData, linksData] = useMemo(() => {
    const nodesData = [];
    const linksData = [];

    const textColor =
      typeof document !== "undefined"
        ? 'black'
        : 'black';
    const linkColor =
      typeof document !== "undefined"
        ? "orange"
        : "orange";

    const colors = generateGradientColors(
      linkColor,
      textColor,
      stackedPages.length + 1
    );

    data.allBrainNote.nodes.forEach((node) => {

      if (!node || !node.slug) {
        return;
      }

      const nodeIndex = stackedPages.findIndex(
        (x) => x.slug === (node.slug)
      );

      nodesData.push({
        id: node.id,
        label: node.title,
        slug: "/" + node.slug,
        color: nodeIndex !== -1 ? colors[nodeIndex + 1] : textColor,
      });

      node.outboundReferenceNotes.forEach((x) =>
        linksData.push({ source: node.id, target: x.childMdx.parent.id })
      );

    });

    return [nodesData, linksData];
  }, [data, stackedPages]);

  return [nodesData, linksData, navigate, highlight];
};
