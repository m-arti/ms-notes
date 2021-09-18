// import React, { Component } from 'react'
//
// const initialState = {
//   query: '',
//   results: [],
// }
//
// class Search extends Component {
//   state = initialState;
//
//   // reset the state when clicking outside the search component
//   // from https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
//
//   reset() {
//     this.setState(initialState);
//   }
//
//   componentDidMount() {
//     document.addEventListener("mousedown", this.handleClickOutside);
//   }
//
//   componentWillUnmount() {
//     document.removeEventListener("mousedown", this.handleClickOutside);
//   }
//
//   node = React.createRef();
//
//   handleClickOutside = e => {
//     if (!this.node.current.contains(e.target)) {
//       this.reset();
//     }
//   };
//
//   handleClickInside = () => {
//     this.reset();
//   };
//
//   render() {
//     const ResultList = () => {
//       let results = []
//       let message = ''
//
//       if (this.state.results.length > 0) {
//         this.state.results.map((page, i) => (
//               results.push({
//                 slug: page.url,
//                 title: page.title,
//                 external: page.external
//               })
//         ))
//       } else if (this.state.query.length > 2) {
//         message = 'No results for ' + this.state.query
//       } else if (
//         this.state.results.length === 0 &&
//         this.state.query.length > 0
//       ) {
//         message = 'Please insert at least 3 characters'
//       } else {
//         message = ''
//       }
//       if (results.length > 0) {
//         return (
//         <div class="search__results">
//           {results.map((result) => (
//               <div class="search__result" key={result}>
//                 { result.external ? (<h6><a href={result.external}>{result.title}</a></h6>) : (<h6><a href={result.slug}>{result.title}</a></h6>) }
//               </div>)
//             )}
//           </div>
//           )
//       } else if (message){
//         return (<div class="search__results">
//           <div class="search__result">{ message }</div>
//         </div>)
//       } else { return '' }
//     }
//
//
//
//     return (
//       <div ref={this.node} class={'row search ' + this.props.classs + '__search'}>
//           <div class={"search__wrapper col-sm-12 col-md-8 col-lg-" + this.props.cols}>
//             <div class="search__input">
//                 <input type="text"
//                 onChange={this.search}
//                 placeholder={'Search'}
//                 />
//                 <i class="fas fa-search"></i>
//             </div>
//               <ResultList />
//           </div>
//       </div>
//     )
//   }
//
//
//
//   getSearchResults(query) {
//     var index = window.__FLEXSEARCH__.en.index
//     var store = window.__FLEXSEARCH__.en.store
//     if (!query || !index) {
//       return []
//     } else {
//       var results = []
//       Object.keys(index).forEach(idx => {
//         results.push(...index[idx].values.search(query))
//       })
//
//       results = Array.from(new Set(results))
//
//       var nodes = store
//         .filter(node => (results.includes(node.id) ? node : null))
//         .map(node => node.node)
//
//       return nodes
//     }
//   }
//
//   search = event => {
//     const query = event.target.value
//     if (this.state.query.length > 2) {
//       const results = this.getSearchResults(query)
//       this.setState({ results: results, query: query })
//     } else {
//       this.setState({ results: [], query: query })
//     }
//   }
// }
//
// export default Search


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

          <div class="item-search" key={i}>
            <p>{page.tags}</p>
            <Link to={page.url}>
              <h3 class='font-bold'>{page.title}</h3>
            </Link>
            <p>———</p>
            <p>{page.excerpt}</p>
            <p>{page.url}</p>

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
      <div class={this.props.classNames}>
        <input
          class="search__input tracking-tight bg-transparent pr-2 text-black text-sm border-b border-gray-200 dark:border-gray-800 focus:outline-none dark:focus:border-yellow-500 focus:border-yellow-500 focus:border-transparent"
          type="text"
          onChange={this.search}
          placeholder={' Search'}
        />
        <div class="search__list text-sm max-w-md">
          <ResultList/>
        </div>
      </div>
    )
  }

  getSearchResults(query) {
    // language
    var index = window.__FLEXSEARCH__.en.index
    var store = window.__FLEXSEARCH__.en.store
    if (!query || !index) {
      return []
    } else {
      var results = []

      // search indexed fields
      Object.keys(index).forEach(idx => {
        results.push(...index[idx].values.search(query))
      })

      // find unique ids of the nodes
      results = Array.from(new Set(results))

      // return corresponding nodes in store
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
