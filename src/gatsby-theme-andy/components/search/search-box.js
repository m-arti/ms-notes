import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
// import { Search as SearchIcon } from "@styled-icons/fa-solid"

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <form className={`${className} transition duration-500 ease-in-out opacity-80 hover:opacity-100 focus:opacity-100`}>
      <input
        className="SearchInput tracking-tight text-sm text-black dark:text-white bg-transparent border-b border-gray-200 dark:border-gray-800 focus:outline-none dark:focus:border-yellow-500 focus:border-yellow-500 focus:border-transparent"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <div
        onclick="document.myform.submit();"
        className='pb-0.5 font-light align-middle'
        style={{ fontSize: '2.2rem', minWidth:'35px',  textAlign: 'center', pointerEvents: 'none', lineHeight: '20px'}}
        aria-label="Search notes"
        title="Search notes"
      >
        ⁕
      </div>
    </form>
  )
)
