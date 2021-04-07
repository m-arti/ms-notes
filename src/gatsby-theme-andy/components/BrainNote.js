import React from 'react';
import { graphql } from "gatsby";
import { Link } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { MDXProvider } from '@mdx-js/react';
import { LinkToStacked } from 'react-stacked-pages-hook';

import components from './MdxComponents';
import useWindowWidth from '../../utils/useWindowWidth';
import SEO from "../components/seo";

// const NOTE_WIDTH = 650; // 576;
const NOTE_MAX_WIDTH = 800; // 768;
const popupStyles = `w-150 px-4 pb-2 rounded-md shadow-xl`;

const BrainNote = ({ note }) => {
  const [width] = useWindowWidth();
  let references = [];
  let referenceBlock;
  if (note.inboundReferenceNotes != null) {
    const RefLink = width < NOTE_MAX_WIDTH ? Link : LinkToStacked;
    references = note.inboundReferenceNotes.map((reference) => (
      <RefLink
        className="no-underline hover:text-gray-500"
        to={reference.slug === 'about' ? `about` : `/${reference.slug}`} // hack
        key={reference.slug}
      >
        <div className={"p-2 ml-2 mb-2 text-gray-600 dark:text-gray-500 rounded-md hover:bg-opacity-50 hover:text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 transform transition duration-500"}>
          <h4 className="text-sm font-medium"><span role="img" aria-label="note emoji">📄</span>&nbsp; {reference.title}</h4>
          <p className="text-sm m-0 mb-0 text-gray-600 dark:text-gray-600 text-justify">{reference.childMdx.excerpt}</p>
        </div>
      </RefLink>
    ));

    if (references.length > 0) {
      referenceBlock = (
        <>
          <h3 className="mt-1 mb-2 font-normal text-gray-600, dark:text-gray-500">Referred in:</h3>
          <div className={"mb-4 border-l-2 border-gray-300 hover:border-gray-400"}>{references}</div>
          <hr className="mx-auto pt-2 mt-6 border-gray-300 dark:border-gray-700"/>
        </>
      );
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
            className={`${popupStyles} bg-gray-100 dark:bg-gray-900 text-black`}
          >
            <div className="flex flex-wrap gap-x-2 content-start">
              <h3 className="mb-2">{ln.title}</h3>
              <LinkToStacked
                className="no-underline"
                to={ln.slug === 'about' ? `about` : `/${ln.slug}`}
              >
                <h3>&nbsp;»</h3>
              </LinkToStacked>
            </div>
            <p className="mb-2 text-sm text-justify">
              {ln.childMdx.excerpt}
            </p>
          </div>
        );
      });
  }

  const AnchorTagWithPopups = (props) => (
    <components.a {...props} popups={popups} noPopups={width < NOTE_MAX_WIDTH} />
  );

  return (
    <MDXProvider components={{ ...components, a: AnchorTagWithPopups }}>
      <SEO title={note.title} description={note.excerpt} />
      <div className="flex-1 mb-4">
        <h1 className="my-4">{note.title}</h1>
        <MDXRenderer>{note.childMdx.body}</MDXRenderer>
      </div>
      <div className="refs-box bg-opacity-50 text-gray-600 rounded-lg p-4 pt-2 bg-gray-100 dark:bg-gray-950">
        {referenceBlock}
        <p className="text-sm m-0 text-gray-600 dark:text-gray-600">
          If you'd like to discuss or share an idea, do get in touch.<br/>
          Send me a {' '}
          <a href="https://twitter.com/messages/compose?recipient_id=622349802">direct message</a>{' '}
          on Twitter or an <a href="mailto:marti.samuel1@gmail.com">email</a>. ℳ𝒮
        </p>
      </div>
    </MDXProvider>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

export default BrainNote;
