import React from 'react';
import { Link } from 'gatsby';
import { useStackedPagesProvider, LinkToStacked } from 'react-stacked-pages-hook';
import { Helmet } from 'react-helmet';

import BrainNote from './BrainNote';
import '../../style.css';

const NOTE_WIDTH = 650; // 576; // w-xl
const PAD = 50;

// A wrapper component to render the content of a page when stacked
const StackedPageWrapper = ({
  PageIndexProvider,
  children,
  slug,
  title,
  overlay,
  obstructed,
  i,
}) => (
  <PageIndexProvider value={i}>
    <div
      className={`note-container md:max-w-2xl px-6 py-4 ${
        obstructed ? `overflow-y hover:bg-gray-200 transition ease-in-out duration-500` : `overflow-y-auto border-r`
      } bg-white md:sticky flex flex-col flex-shrink-0 ${
        overlay ? 'shadow-xl' : 'border-r px-6'
      }`}
      style={{ left: PAD * i, right: - NOTE_WIDTH + PAD, width: NOTE_WIDTH }}
    >
      <div
        className={`md:block hidden transition-opacity duration-100 ${
          obstructed ? `opacity-100` : `opacity-0`
        }`}
      >
        <div className={`overflow-visible w-full transform rotate-90 origin-left absolute z-10`}>
          <LinkToStacked to={slug} className="object-center no-underline text-gray-1000">
            <p className="m-1 h-full w-full font-medium tracking-normal">{title || slug}</p>
          </LinkToStacked>
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

  return (
    <div className="text-gray-1000 flex flex-col min-h-screen h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {siteMetadata.title} — {note.title}
        </title>
      </Helmet>
      <header>
        <div className="py-0 pb-4 border-b px-6">
          <Link to="/" className="no-underline text-gray-1000">
            <h3 className="font-medium tracking-normal">{siteMetadata.title}</h3>
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
            >
              <BrainNote note={note} />
            </StackedPageWrapper>

            {/* Render the stacked pages */}
            {stackedPages.map((page, i) => (
              <StackedPageWrapper
                PageIndexProvider={PageIndexProvider}
                i={i + 1}
                key={page.slug}
                slug={page.slug}
                title={page.data.title}
                overlay={stackedPageStates[page.slug] && stackedPageStates[page.slug].overlay}
                obstructed={stackedPageStates[page.slug] && stackedPageStates[page.slug].obstructed}
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
