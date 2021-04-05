import React from 'react';
import { Link } from 'gatsby';
import { useStackedPagesProvider, LinkToStacked } from 'react-stacked-pages-hook';
import { Helmet } from 'react-helmet';

import BrainNote from './BrainNote';
import '../../style.css';

const NOTE_WIDTH = 650; // 576; // w-xl
const PAD = 50;
let NUMOFPAGES = 0;

// A wrapper component to render the content of a page when stacked
const StackedPageWrapper = ({
  PageIndexProvider,
  ContextProvider,
  stackedPages,
  children,
  slug,
  title,
  overlay,
  obstructed,
  highlighted,
  i,
}) => (
  <PageIndexProvider value={i}>
    <div
      className={
        `note-container md:max-w-2xl px-6 py-4 bg-opacity-100
        ${obstructed ? `overflow-y transition ease-in-out duration-500` : `overflow-y-auto border-r`}
        bg-white dark:border-gray-800 bg-black md:sticky flex flex-col flex-shrink-0
        ${overlay ? 'shadow-xl' : 'border-r px-6 '}`
      }
      style={{
        left: PAD * i,
        right: - NOTE_WIDTH + PAD,
        width: NOTE_WIDTH
      }}
    >
      <div
        className={`md:block hidden transition-opacity duration-100 ${
          obstructed ? `opacity-100` : `opacity-0`
        }`}
      >
        <div className={`overflow-visible h-auto w-full transform rotate-90 origin-left absolute z-50 grid grid-cols-12 gap-12`}>

          <div class="col-span-7">
            <LinkToStacked to={slug} className="no-underline text-gray-1000">
              <p className="m-1 font-medium tracking-normal">{title || slug}</p>
            </LinkToStacked>
          </div>

          <div className="w-full text-sm">
            <LinkToStacked to={slug} className=" no-underline">
            <p className={
              `pt-1 my-0 pl-56 pr-24 tracking-normal text-gray-600
              ${i===2 ? `font-normal text-lg` : `font-light`}`
            }>
            {(NUMOFPAGES >= 5 && i===2) ? `⋮` : ``}
            {(NUMOFPAGES === 5 && i!==2) ? i+1 : ``}
            {(NUMOFPAGES > 5 && (i < 2 || i >= (NUMOFPAGES-3))) ? i+1 : ``}
            {(i >= 5 && ((i+1) % 2 === 0) && i < (NUMOFPAGES-3)) ? i+1 : ``}
            </p>
            </LinkToStacked>
          </div>

        </div>
      </div>
      <div
        className={`flex flex-col min-h-full transition-opacity duration-100 ${
          obstructed ? `opacity-0` : `opacity-100`
        }`}
      >
        {children}
      </div>
    </div>
  </PageIndexProvider>
);

const BrainNotesContainer = ({ slug, note, location, siteMetadata }) => {
  // process data from gatsby pageQuery API
  const processPageQuery = React.useCallback((x) => x.json.data.brainNote, []);
  const [
    stackedPages,
    stackedPageStates,
    navigateToStackedPage,
    ContextProvider,
    PageIndexProvider,
    scrollContainer,
    highlightStackedPage,
  ] = useStackedPagesProvider({
    firstPageSlug: slug,
    location,
    processPageQuery,
    pageWidth: NOTE_WIDTH,
  });

  NUMOFPAGES = stackedPages.length + 1;

  return (
    <div className="text-gray-1000 flex flex-col min-h-screen h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {siteMetadata.title} — {note.title}
        </title>
      </Helmet>
      <header className ="border-b dark:border-gray-800 bg-gray-800 bg-opacity-50 dark:text-teal-400">
        <div className="pb-4">
          <Link to="/" className="no-underline text-gray-1000">
            <h3 className="tracking-normal">{siteMetadata.title}</h3>
          </Link>
        </div>
      </header>

      <div
        className="flex-0 flex flex-grow overflow-x-hidden md:overflow-x-auto overflow-y-hidden"
        ref={scrollContainer}
      >
        <div
          className="note-columns-container flex flex-grow transition-width duration-100"
          style={{ width: NOTE_WIDTH * (stackedPages.length + 1) }}
        >
          <ContextProvider value={{ stackedPages, navigateToStackedPage }}>
            {/* Render the first page */}
            <StackedPageWrapper
              PageIndexProvider={PageIndexProvider}
              i={0}
              slug={slug}
              title={note.title}
              overlay={stackedPageStates[slug] && stackedPageStates[slug].overlay}
              obstructed={stackedPageStates[slug] && stackedPageStates[slug].obstructed}
              highlighted={stackedPageStates[slug] && stackedPageStates[slug].highlighted}
            >
              <BrainNote note={note} />
            </StackedPageWrapper>

            {/* Render the stacked pages */}
            {stackedPages.map((page, i) => (
              <StackedPageWrapper
                PageIndexProvider={PageIndexProvider}
                i={i + 1}
                NUMOFPAGES = {i}
                key={page.slug}
                slug={page.slug}
                title={page.data.title}
                overlay={stackedPageStates[page.slug] && stackedPageStates[page.slug].overlay}
                obstructed={stackedPageStates[page.slug] && stackedPageStates[page.slug].obstructed}
                highlighted={stackedPageStates[slug] && stackedPageStates[slug].highlighted}
              >
                <BrainNote note={page.data} />
              </StackedPageWrapper>
            ))}
          </ContextProvider>
        </div>
      </div>
    </div>
  );
};

export default BrainNotesContainer;
