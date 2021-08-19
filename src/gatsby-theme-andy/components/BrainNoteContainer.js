import React from 'react';
import { Link } from 'gatsby';
import { useStackedPagesProvider, LinkToStacked } from 'react-stacked-pages-hook';
import { Helmet } from 'react-helmet';

import BrainNote from './BrainNote';
import '../../style.css';

// thanks to wolfr.am/UyuFSKsg for script for light/dark mode switching.
import DarkModeToggle from "./DarkModeToggle";
import GraphButton from "./GraphButton";
// import Timer from "./Timer";

// To add Search
// import Search from "./Search";
// <div className="p-2 rounded">
//   <Search/>
// </div>

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
        `note-container border-opacity-50 dark:border-opacity-50 dark:border-l dark:border-gray-800 bg-white md:max-w-2xl px-6 py-4 bg-opacity-100
        ${obstructed ? `overflow-y transition ease-in-out duration-500` : `overflow-y-auto border-r dark:border-gray-800`}
        bg-white text-black dark:text-gray-200 md:sticky flex flex-col flex-shrink-0
        ${overlay ? 'shadow-xl border-l border-gray-100 dark:border-gray-800' : 'border-r border-gray-200 dark:border-gray-800 px-6'}`
      }
      style={{
        left: PAD * i,
        right: - NOTE_WIDTH + PAD,
        width: NOTE_WIDTH
      }}
    >
      <div
        id = {`note-container-${slug.replace('/', '') }`}
        className={`md:block hidden transition-opacity duration-100 ${
          obstructed ? `opacity-100` : `opacity-0`
        }`}
      >
        <div className={`overflow-visible h-auto w-full transform rotate-90 origin-left absolute z-50 grid grid-cols-12 gap-12`}>

          <div className="col-span-7">
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
  ] = useStackedPagesProvider({
    firstPageSlug: slug,
    location,
    processPageQuery,
    pageWidth: NOTE_WIDTH,
  });

  NUMOFPAGES = stackedPages.length + 1;

  return (
    <div className="nightwind bg-white text-black flex flex-col min-h-screen h-screen">
      <Helmet>

        <script
          dangerouslySetInnerHTML={{
            __html:` nightwind.init()`,
          }}
          type="text/javascript"
        />

        <script>
        {`
          function checkDarkMode() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          }

          function watchDarkMode() {
            if (!window.matchMedia) return;
            window.matchMedia('(prefers-color-scheme: dark)').addListener(addDarkModeSelector);
          }

          function addDarkModeSelector() {
            if (checkDarkMode()) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }

          addDarkModeSelector();
          watchDarkMode();
        `}
        </script>

        <script crossorigin src="https://unpkg.com/wolfram-notebook-embedder@0.1/dist/wolfram-notebook-embedder.min.js">
        </script>

        <script type="module" src="https://unpkg.com/@navsnpm/katex-expression/dist/katex-expression/katex-expression.esm.js"></script>
        <script nomodule="" src="https://unpkg.com/@navsnpm/katex-expression/dist/katex-expression/katex-expression.js"></script>

        <meta charSet="utf-8" />
        <title>
          {note.title} | {siteMetadata.title}
        </title>

      </Helmet>
      <header className = "nightwind border-b border-white border-opacity-0 dark:border-gray-800">
        <div className="pb-4">
          <Link to="/" className="no-underline text-black text-xl">
            <h3 style={{fontFamily:'Caveat', fontWeight: '600'}} className="tracking-normal">{siteMetadata.title}</h3>
          </Link>
        </div>

        <div className = "flex justify-end">
          <div className="controls">
            <GraphButton/>
            <DarkModeToggle/>
          </div>
        </div>

      </header>

      <div
        className= "nightwind flex flex-grow overflow-x-hidden md:overflow-x-auto overflow-y-hidden" ref={scrollContainer}
      >
        <div
          className="note-columns-container nightwind bg-white flex flex-grow transition-width duration-100"
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
