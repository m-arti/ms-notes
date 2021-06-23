import React, { Component } from 'react';
import { Link } from 'gatsby';
import { useStackedPagesProvider, LinkToStacked } from 'react-stacked-pages-hook';

// Search component
class Search extends Component {
  state = {
    query: '',
    results: [],
  }

  render() {
    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((page, i) => (

          <div className="item-search" key={i}>
            <Link to={page.slug}>
              <h3>{page.title}</h3>
            </Link>
            <h4>{page.url}</h4>
            <h4>{page.excerpt}</h4>
          </div>

        ))
      } else if (this.state.query.length > 2) {
        return 'No results for ' + this.state.query
      } else if (
        this.state.results.length === 0 &&
        this.state.query.length > 0
      ) {
        return 'Type at least 3 characters'
      } else {
        return ''
      }
    }

    return (
      <div className={this.props.classNames}>
        <input
          className="search__input tracking-tight bg-white pr-2 text-black border-b border-gray-200 focus:outline-none focus:border-yellow-500 focus:border-transparent"
          type="text"
          onChange={this.search}
          placeholder={' > Search...'}
        />
        <div className="search__list -pl-2 text-sm max-w-md">
          <ResultList/>
        </div>
      </div>
    )
  }

  getSearchResults(query) {
    var index = window.__FLEXSEARCH__.en.index
    var store = window.__FLEXSEARCH__.en.store
    if (!query || !index) {
      return []
    } else {
      var results = []
      Object.keys(index).forEach(idx => {
        results.push(...index[idx].values.search(query))
      })

      results = Array.from(new Set(results))

      var nodes = store
        .filter(node => (results.includes(node.id) ? node : null))
        .map(node => node.node)

      return nodes
    }
  }

  search = event => {
    const query = event.target.value
    if (this.state.query.length > 2) {
      const results = this.getSearchResults(query)
      this.setState({ results: results, query: query })
    } else {
      this.setState({ results: [], query: query })
    }
  }
}

export default Search
