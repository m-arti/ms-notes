import React from 'react';
import Tippy from '@tippyjs/react';
import {inlinePositioning} from 'tippy.js';
import 'tippy.js/animations/shift-away.css';
import { LinkToStacked } from 'react-stacked-pages-hook';
import { Link } from 'gatsby';

// import * as WolframNotebookEmbedder from 'wolfram-notebook-embedder';

// Animation styles are imported in `src/styles.css`

// TODO cmd+click open page in new tab

const innerLinkStyles = `text-blue-600 dark:text-blue-300 px-1 -mx-1 rounded dark:hover:bg-blue-900`;

const AnchorTag = ({ href, popups = {}, noPopups = false, ...restProps }) => {
  if (!href) href = restProps.to;
  if (!href.match(/^http/))
    return noPopups ? (
      <Link {...restProps} to={href} className={`${innerLinkStyles} hover:bg-indigo-100`
      }/>
    ) : (
      <Tippy content={popups[href.replace(/^\//, '')]} placement="right" animation="shift-away" duration="500" arrow={true} interactive={true} hideOnClick={true} inlinePositioning={true} interactiveDebounce="100" plugins={[inlinePositioning]}>
        <LinkToStacked {...restProps} to={href} className={`${innerLinkStyles} hover:bg-indigo-100`} />
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
          py-1 px-2 rounded text-sm text-blue-600 shadow-md bg-white dark:bg-gray-800`}>{href}</div>
      }
    >
      <a className="" {...restProps} href={href} />
    </Tippy>
  );
};

const NoteTag = ({ children, color }) => (
  <div
    className=
    {`notetag antialiased bg-${color}-100 text-black py-1 px-2 mb-5 mr-2 text-xs font-normal rounded-md inline-block`}
  >
    {children}
  </div>
);

// styles for embedded notebooks
// const nbStyles = `w-full pb-6 align-middle border-t-2 border-gray-300 hover:border-t-2 hover:border-orange-400 transition ease-in-out duration-500`;

// Embed Wolfram Notebooks in notes (code from: https://wolfr.am/SHFaaKUP)
// class NotebookEmbed extends React.Component {
//
//   componentDidMount() {
//     this.embedding = WolframNotebookEmbedder.embed(this.props.url, this.el, this.props.attributes);
//   }
//
//   componentWillUnmount() {
//     this.embedding.then(nb => nb.detach());
//   }
//
//   render() {
//     return (
//       <div class={nbStyles} style={{width: 545}}>
//         <div
//           className="NotebookEmbed"
//           ref={el => this.el = el}
//           attributes={attributes => this.attributes = attributes}
//         />
//       </div>
//     );
//   }
// }

export default {
  a: AnchorTag,
  NoteTag,
  // WolframNotebook: NotebookEmbed,
};
