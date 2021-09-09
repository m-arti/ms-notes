import { Link } from "gatsby"
import { default as React } from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      <div>
      <p className='px-3 py-1 rounded-md bg-gray-200 bg-opacity-50 text-black dark:text-gray-500 text-sm'>{hitCount} note{hitCount !== 1 ? `s` : ``}</p>
      </div>
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <div>
    <hr className='border-opacity-50'/>
    <Link className='no-underline hover:underline' to={hit.slug}>
      <h3 className='text-sm text-black'>
        <Highlight attribute="title" hit={hit} tagName="mark"/>
      </h3>
    </Link>
    <Snippet className='text-xs text-gray-500' attribute="excerpt" hit={hit} tagName="mark"/>
    <span className='text-xs text-gray-500'>...</span>
  </div>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount/>
    <Hits className="Hits" hitComponent={PageHit}/>
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div className= {`${className} mt-8`} >
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name}/>
    ))}
    <hr className='ml-6 border-opacity-50'/>
    <PoweredBy className='text-xs text-gray-500 dark:text-gray-500'/>
  </div>
)

export default SearchResult
