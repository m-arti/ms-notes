import React from 'react';
import Tippy from '@tippyjs/react';
import {inlinePositioning} from 'tippy.js';
import 'tippy.js/animations/shift-away.css';
import { LinkToStacked } from 'react-stacked-pages-hook';
import { Link } from 'gatsby';

import * as WolframNotebookEmbedder from 'wolfram-notebook-embedder';

import Image from "./Image";
import ZoomableImage from "./ZoomableImage";

import styled from 'styled-components';
import {ExternalLinkOutline} from '@styled-icons/evaicons-outline/ExternalLinkOutline';
const EnlargeNotebookIcon = styled(ExternalLinkOutline)`
  width: 15px !important;
`;

// Animation styles are imported in `src/styles.css`

// TODO cmd+click open page in new tab

const linkStyles = `Links text-blue-500 dark:text-blue-300 px-1 -mx-1 rounded dark:hover:bg-blue-900 hover:bg-opacity-80 dark:hover:bg-opacity-80`;

const AnchorTag = ({ href, popups = {}, noPopups = false, ...restProps }) => {
  if (!href) href = restProps.to;
  if (!href.match(/^http/))
    return noPopups ? (
      <Link {...restProps} to={href} class={`${linkStyles} transition duration-500 hover:bg-indigo-100`
      }/>
    ) : (
      <Tippy content={popups[href.replace(/^\//, '')]} placement="right" animation="shift-away" duration="500" arrow={true} interactive={true} hideOnClick={true} inlinePositioning={true} interactiveDebounce="100" plugins={[inlinePositioning]}>
        <LinkToStacked {...restProps} to={href} class={`${linkStyles} transition duration-500 hover:bg-indigo-100`} />
      </Tippy>
    );
  return noPopups || restProps.children === href ? (
    <a {...restProps} href={href} />
  ) : (
    <Tippy
      placement="top"
      animation="shift-away"
      duration="500"
      maxWidth="none"
      // interactive="true"
      // interactiveDebounce="100"
      // interactiveBorder="30"
      content={
        <div className={`${linkStyles}
          py-1 px-2 rounded text-sm text-blue-500 shadow-md bg-cream dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-50`}>{href}</div>
      }
    >
      <a class="" {...restProps} href={href} />
    </Tippy>
  );
};

const CollapsedText = ({ children, summary, text }) => (
  <div class='pt-4 pb-4 pl-6 pr-6 rounded-lg text-blue-800 bg-blue-50 dark:bg-opacity-50'>
    <details>
      <summary class='pt-2 pb-2'><b>{summary}</b> (click to open)</summary>
      <hr class='border-blue-200 dark:border-blue-900'/>
      <p class='pt-2 pb-2 text-left'>
        {text}
      </p>
    </details>
  </div>
);

const Figcaption = ({ children }) => (
  <div
    class= "pt-0 mt-0 mb-6 text-sm font-light text-center text-gray-500 "
  >
    {children}
  </div>
);

const NoteTag = ({ children, color }) => (
  <div
    class=
    {`notetag py-1 px-2 mb-10 mr-2 text-xs inline-block rounded-md ${color==='beige' ? 'text-gray-700': 'text-'+color+'-700'} bg-${color}${color==='beige' ? '': '-100'} dark:${color==='beige' ? 'text-gray-300': 'text-'+color+'-300'} dark:bg-opacity-75 ${color==='beige' ? 'bg-gray-100': ''}`}
  >
    {children}
  </div>
);

const WolframNotebook = ({ children, url }) => (
  <div class='pt-4 mt-4'>
    <iframe class='mb-2 pb-2' src={`https://www.wolframcloud.com/view?url=https://raw.githubusercontent.com/m-arti/ms-notes/main/notebooks/${url}`} width="100%" height="600"></iframe>
    <Figcaption>
      <span class="wolframicon align-middle"></span>
      <span class="text-xl font-thin align-middle">｜</span>
      {children} (<AnchorTag href={`https://www.wolframcloud.com/view?url=https://raw.githubusercontent.com/m-arti/ms-notes/main/notebooks/${url}`} target='_blank'>
        Expand Notebook <EnlargeNotebookIcon/>
      </AnchorTag>)
    </Figcaption>
  </div>
);

// styles for embedded notebooks
// const nbStyles = `dark:bg-black w-full pb-6 align-middle border-t-2 border-gray-300 hover:border-t-2 hover:border-orange-400 transition ease-in-out duration-500`;

// Embed Wolfram Notebooks in notes (code from: https://wolfr.am/SHFaaKUP)
// class WolframNotebook extends React.Component {
//
//   constructor () {
//     super()
//     this.state = {}
//   }
//
//   async componentDidMount() {
//     if (typeof window !== 'undefined') {
//       this.embedding = await WolframNotebookEmbedder.embed(this.props.url, this.el, this.props.attributes);
//     }
//   }
//
//   componentWillUnmount() {
//     if (typeof window !== 'undefined') {
//       this.embedding.then(nb => nb.detach());
//     }
//   }
//
//   render() {
//     return (
//       <div class={nbStyles} style={{width: '100%'}}>
//         <div class="WolframNotebook" id="WolframNotebook" ref={el => this.el = el} />
//       </div>
//     );
//   }
// }

export default {
  a: AnchorTag,
  CollapsedText,
  figcaption: Figcaption,
  img: Image,
  zimg: ZoomableImage,
  NoteTag,
  WolframNotebook,
};
