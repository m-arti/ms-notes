import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { MDXProvider } from '@mdx-js/react';
import { LinkToStacked } from 'react-stacked-pages-hook';

import scrollTo from 'gatsby-plugin-smoothscroll';

import { DateTime } from "luxon";

import components from './MdxComponents';
import useWindowWidth from '../../utils/useWindowWidth';
import SEO from "../components/seo";

import styled from 'styled-components';
import {ArrowIosUpwardOutline} from '@styled-icons/evaicons-outline/ArrowIosUpwardOutline';
const ScrollToTopIcon = styled(ArrowIosUpwardOutline)`
  width: 25px !important;
`;

const footerItemsStyles = `text-gray-600 dark:text-gray-500 rounded-md hover:text-gray-800 hover:bg-beige dark:hover:bg-gray-800 dark:hover:bg-opacity-30 transform transition duration-500`;

// const NOTE_WIDTH = 650; // 576;
const NOTE_MAX_WIDTH = 800; // 768;
const popupStyles = `Popups w-150 px-4 pb-2 rounded-lg shadow-xl`;

const BrainNote = ({ note }) => {

  // graphql query
  const data = useStaticQuery(query)

  // get git update times from graphql query
  let updateTimes = [];
  updateTimes = data.allFile.nodes.map(node => (
    [node.name, node.fields.gitLogLatestDate]
  ));
  // map note slugs to update times to form a dict
  const updateTimesDict = new Map(updateTimes.map(([k, v]) => [k, v]));

  const [width] = useWindowWidth();
  let references = [];
  let referenceBlock;
  if (note.inboundReferenceNotes != null) {
    const RefLink = width < NOTE_MAX_WIDTH ? Link : LinkToStacked;
    references = note.inboundReferenceNotes.map((reference) => (
      <RefLink
        class="no-underline"
        to={reference.slug === 'about' ? `about` : `/${reference.slug}`} // hack
        key={reference.slug}
      >
        <div class={`p-3 ml-2 mb-2 ${footerItemsStyles}`}>
          <h4 class="text-sm font-medium"><span role="img" aria-label="note emoji">📄</span>&ensp; {reference.title}</h4>
          <p class="m-0 mb-0 mt-1 text-sm dark:text-gray-500 text-justify">{reference.childMdx.excerpt.replace(' .', '.').replace(' . ', '. ').replace(' , ', ', ').replace(' )', ')').replace(' (', '(')}</p>
        </div>
      </RefLink>
    ));

    // get css selector to scroll up to
    const scrollToTarget = `#note-container-${note.slug.replace('/', '')}`;

    // put scroll button before refs / contact text
    if (references.length > 0) {
      referenceBlock = (
        <div>
          <div class='mb-4 text-center'>
            <button class={`py-0 px-4 ${footerItemsStyles}`} onClick={() => scrollTo(scrollToTarget)} title='Scroll to top'><ScrollToTopIcon/></button>
          </div>
          <h3 class="mt-1 mb-4 font-normal text-sm text-gray-600 dark:text-gray-500">Referred in:</h3>
          <div class={"mb-8 border-l border-beige dark:border-gray-800 hover:border-beigeDarker dark:hover:border-gray-700"}>{references}</div>
        </div>
      );
    }

    else {
      referenceBlock = (
        <>
        <div class='mb-4 text-center'>
          <button class={`-my-2 px-4 ${footerItemsStyles}`} onClick={() => scrollTo(scrollToTarget)} title='Scroll to top'><ScrollToTopIcon/></button>
        </div>
        </>
      )
    }
  }

  const popups = {};
  if (note.outboundReferenceNotes) {
    note.outboundReferenceNotes
      .filter((reference) => !!reference.childMdx.excerpt)
      .forEach((ln, i) => {
        popups[ln.slug] = (
          <div
            id={ln.slug}
            class={`${popupStyles} bg-opacity-50 bg-beige dark:bg-gray-900 dark:bg-opacity-50 text-black`}
          >
            <div class="flex flex-wrap gap-x-2 content-start">
              <h3 class="mb-2">
              {ln.title}
              <LinkToStacked
                class="no-underline text-2xl"
                to={ln.slug === 'about' ? `about` : `/${ln.slug}`}
                title='Open note'
              >
              &nbsp;&nbsp;◫
              </LinkToStacked>
              </h3>
            </div>
            <p class="mb-2 text-sm text-left">
              {ln.childMdx.excerpt.replace(' . ', '. ').replace(' , ', ', ').replace(' )', ')').replace(' (', '(')}
            </p>
          </div>
        );
      });
  }

  const AnchorTagWithPopups = (props) => (
    <components.a {...props} popups={popups} noPopups={width < NOTE_MAX_WIDTH} />
  );

  // note update time (Δ ⁘ ⊹ ✎)
  const noteLastUpdated = updateTimesDict.get(note.slug) ? ( DateTime.fromISO(updateTimesDict.get(note.slug)).toRelative() || '' ) : undefined;

  // omit title ( <h1 class="mt-3 mb-4 max-w-sm">{note.title}</h1> ) on 'about' page
  // omit last updated time on 'about' page
  return (
    <MDXProvider components={{ ...components, a: AnchorTagWithPopups }}>
      <SEO title={note.title} description={note.excerpt} />
      <div class="flex-1 mb-4">

        {note.slug !== 'about' ? <h1 class="mt-3 mb-4 max-w-sm">{note.title}</h1> : ''}

        {note.slug !== 'about' && <span class="text-sm font-serif font-medium align-middle text-gray-500">{noteLastUpdated ? '✎' : ''}</span>}

        {(note.slug !== 'about' && noteLastUpdated !== undefined) && <span class="text-xs uppercase tracking-wide text-gray-700 dark:text-gray-300" title={`Last updated ${noteLastUpdated}`}>
          &nbsp;{noteLastUpdated.replace('minute','min').replace('hour','hr').replace('week','wk').replace('month','mo').replace('year','yr')}&emsp;&nbsp;</span>}

        <MDXRenderer>{note.childMdx.body}</MDXRenderer>
      </div>
      <div>
        <div class="refs-box p-6 pt-4 pb-4 mb-4 text-gray-600 rounded-lg bg-beige bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30">
          {referenceBlock}
          {
            note.slug === 'about' ?
            <p class="m-0 pb-4 text-sm text-center text-gray-600 dark:text-gray-500">
            “The impossible is the least that one can demand.”<br/>
            ― James Baldwin, <em>The Fire Next Time</em>
            </p> :
            <p class="-mb-4"></p>
          }
        </div>
      </div>
    </MDXProvider>
  );
};

// Site last updated: {data.site.buildTime}

export const query = graphql`
  query {
    site {
      buildTime(fromNow: true)
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allFile (filter: { extension: { eq: "mdx" } }) {
      nodes {
        name
        fields {
          gitLogLatestDate(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`

export default BrainNote;
