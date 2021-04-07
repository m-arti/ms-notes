import React from 'react';
import * as WolframNotebookEmbedder from 'wolfram-notebook-embedder';

// styles for embedded notebooks
const nbStyles = `dark:bg-black w-full pb-6 align-middle border-t-2 border-gray-300 hover:border-t-2 hover:border-orange-400 transition ease-in-out duration-500`;

// Embed Wolfram Notebooks in notes (code from: https://wolfr.am/SHFaaKUP)

class WolframNotebook extends React.Component {

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
      <div className="NotebookEmbed" ref={el => this.el = el} />
    );
  }
}

export default WolframNotebook;
