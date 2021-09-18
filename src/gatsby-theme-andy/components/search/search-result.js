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
    <div class="HitCount">
      <div>
      <p class='px-3 py-1 m-0 rounded-md bg-beige bg-opacity-50 text-black dark:text-gray-500 text-sm'>{hitCount} note{hitCount !== 1 ? `s` : ``}</p>
      </div>
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <div>
    <hr class='border-opacity-50'/>
    <Link class='no-underline hover:underline' to={hit.slug}>
      <h3 class='text-sm text-black no-underline hover:underline'>
        <Highlight attribute="title" hit={hit} tagName="mark"/>
      </h3>
    </Link>
    <Snippet class='text-xs text-gray-500' attribute="excerpt" hit={hit} tagName="mark"/>
    <span class='text-xs text-gray-500'>...</span>
  </div>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount/>
    <Hits class="Hits" hitComponent={PageHit}/>
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div class={className} >
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name}/>
    ))}
    <hr class='ml-6 border-opacity-50'/>
    <PoweredBy class='text-xs text-gray-500 dark:text-gray-500'/>
  </div>
)

export default SearchResult
