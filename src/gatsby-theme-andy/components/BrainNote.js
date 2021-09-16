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

const footerItemsStyles = `text-gray-600 dark:text-gray-500 rounded-md hover:text-gray-800 hover:bg-beige dark:hover:bg-gray-800 dark:hover:bg-opacity-50 transform transition duration-500`;

// const NOTE_WIDTH = 650; // 576;
const NOTE_MAX_WIDTH = 800; // 768;
const popupStyles = `Popups w-150 px-4 pb-2 rounded-md shadow-xl`;

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
        className="no-underline"
        to={reference.slug === 'about' ? `about` : `/${reference.slug}`} // hack
        key={reference.slug}
      >
        <div className={`p-3 ml-2 mb-2 ${footerItemsStyles}`}>
          <h4 className="text-sm font-medium"><span role="img" aria-label="note emoji">📄</span>&ensp; {reference.title}</h4>
          <p className="m-0 mb-0 mt-1 text-sm dark:text-gray-500 text-justify">{reference.childMdx.excerpt.replace(' .', '.').replace(' . ', '. ').replace(' , ', ', ').replace(' )', ')').replace(' (', '(')}</p>
        </div>
      </RefLink>
    ));

    // get css selector to scroll up to
    const scrollToTarget = `#note-container-${note.slug.replace('/', '')}`;

    // put scroll button before refs / contact text
    if (references.length > 0) {
      referenceBlock = (
        <>
        <div className='mb-4 text-center'>
          <button className={`py-0 px-4 ${footerItemsStyles}`} onClick={() => scrollTo(scrollToTarget)} title='Scroll to top'><ScrollToTopIcon/></button>
        </div>

          <h3 className="mt-1 mb-4 font-normal text-sm text-gray-600 dark:text-gray-500">Referred in:</h3>
          <div className={"mb-4 border-l-2 border-beige dark:border-gray-800 hover:border-beigeDarker dark:hover:border-gray-700"}>{references}</div>
          <div className="mt-6 mb-6 border-b rounded border-beigeDarker border dark:border-gray-800"/>
        </>
      );
    }

    else {
      referenceBlock = (
        <>
        <div className='mb-4 text-center'>
          <button className={`-my-2 px-4 ${footerItemsStyles}`} onClick={() => scrollTo(scrollToTarget)} title='Scroll to top'><ScrollToTopIcon/></button>
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
            className={`${popupStyles} bg-opacity-50 bg-beige dark:bg-gray-900 dark:bg-opacity-50 text-black`}
          >
            <div className="flex flex-wrap gap-x-2 content-start">
              <h3 className="mb-2">
              {ln.title}
              <LinkToStacked
                className="no-underline text-2xl"
                to={ln.slug === 'about' ? `about` : `/${ln.slug}`}
                title='Open note'
              >
              &nbsp;&nbsp;◫
              </LinkToStacked>
              </h3>
            </div>
            <p className="mb-2 text-sm text-left">
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

  // omit last updated time on 'about' page
  return (
    <MDXProvider components={{ ...components, a: AnchorTagWithPopups }}>
      <SEO title={note.title} description={note.excerpt} />
      <div className="flex-1 mb-4">
        <h1 className="mt-3 mb-4 max-w-sm">{note.title}</h1>

        {note.slug !== 'about' && <span className="text-sm font-serif font-medium align-middle text-gray-500">{noteLastUpdated ? '✎' : ''}</span>}

        {(note.slug !== 'about' && noteLastUpdated !== undefined) && <span className="text-xs uppercase tracking-wide text-gray-700 dark:text-gray-300" title={`Last updated ${noteLastUpdated}`}>
          &nbsp;{noteLastUpdated.replace('minute','min').replace('hour','hr').replace('week','wk').replace('month','mo').replace('year','yr')}&emsp;&nbsp;</span>}

        <MDXRenderer>{note.childMdx.body}</MDXRenderer>
      </div>
      <div className="refs-box p-6 pt-4 text-gray-600 rounded-lg bg-beige bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50">
        {referenceBlock}
        <p className="m-0 text-sm text-gray-600 dark:text-gray-500">
          If you'd like to discuss or share an idea, do get in touch.<br/>
          Send me a {' '}
          <a href="https://twitter.com/messages/compose?recipient_id=622349802">direct message</a>{' '}
          on Twitter or an <a href="mailto:marti.samuel1@gmail.com">email</a>.
        </p>
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
