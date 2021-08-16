import React from 'react';
import Tippy from '@tippyjs/react';
import {inlinePositioning} from 'tippy.js';
import 'tippy.js/animations/shift-away.css';
import { LinkToStacked } from 'react-stacked-pages-hook';
import { Link } from 'gatsby';

import * as WolframNotebookEmbedder from 'wolfram-notebook-embedder';

import Image from "./Image";

// Animation styles are imported in `src/styles.css`

// TODO cmd+click open page in new tab

const innerLinkStyles = `text-blue-600 dark:text-blue-300 px-1 -mx-1 rounded dark:hover:bg-blue-900 hover:bg-opacity-80 dark:hover:bg-opacity-80`;

const AnchorTag = ({ href, popups = {}, noPopups = false, ...restProps }) => {
  if (!href) href = restProps.to;
  if (!href.match(/^http/))
    return noPopups ? (
      <Link {...restProps} to={href} className={`${innerLinkStyles} transition duration-500 hover:bg-indigo-100`
      }/>
    ) : (
      <Tippy content={popups[href.replace(/^\//, '')]} placement="right" animation="shift-away" duration="500" arrow={true} interactive={true} hideOnClick={true} inlinePositioning={true} interactiveDebounce="100" plugins={[inlinePositioning]}>
        <LinkToStacked {...restProps} to={href} className={`${innerLinkStyles} transition duration-500 hover:bg-indigo-100`} />
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
        <div className={`${innerLinkStyles}
          py-1 px-2 rounded text-sm text-blue-600 shadow-md bg-white dark:bg-gray-900`}>{href}</div>
      }
    >
      <a className="" {...restProps} href={href} />
    </Tippy>
  );
};

const CollapsedText = ({ children, summary, text }) => (
  <div className='pt-4 pb-4 pl-6 pr-6 rounded-lg text-blue-800 bg-blue-50 dark:bg-opacity-50'>
    <details>
      <summary className='pt-2 pb-2'><b>{summary}</b> (click to open)</summary>
      <hr className='border-blue-200 dark:border-blue-900'/>
      <p className='pt-2 pb-2 text-left'>
        {text}
      </p>
    </details>
  </div>
);

const Figcaption = ({ children }) => (
  <div
    className= "mt-1 mb-4 text-sm font-light text-center text-gray-500 "
  >
    {children}
  </div>
);

const NoteTag = ({ children, color }) => (
  <div
    className=
    {`notetag antialiased bg-${color}-100 dark:bg-opacity-75 text-black py-1 px-2 mb-10 mr-2 text-xs rounded-md inline-block`}
  >
    {children}
  </div>
);

// styles for embedded notebooks
const nbStyles = `dark:bg-black w-full pb-6 align-middle border-t-2 border-gray-300 hover:border-t-2 hover:border-orange-400 transition ease-in-out duration-500`;

// Embed Wolfram Notebooks in notes (code from: https://wolfr.am/SHFaaKUP)
class WolframNotebook extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  async componentDidMount() {
    if (typeof window !== 'undefined') {
      this.embedding = await WolframNotebookEmbedder.embed(this.props.url, this.el, this.props.attributes);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      this.embedding.then(nb => nb.detach());
    }
  }

  render() {
    return (
      <div className={nbStyles} style={{width: '100%'}}>
        <div className="WolframNotebook" id="WolframNotebook" ref={el => this.el = el} />
      </div>
    );
  }
}

export default {
  a: AnchorTag,
  CollapsedText,
  figcaption: Figcaption,
  img: Image,
  NoteTag,
  WolframNotebook,
};
