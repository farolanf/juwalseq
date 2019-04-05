import React from 'react'
import useStore from '$useStore'

const Search = () => {
  const { product } = useStore()
  product.searchProducts({})
  return (
    <div>
      {product.results && product.results.hits.hits.map(hit => (
        <h1 key={hit._id}>{hit._id} - {hit._source.name}</h1>
      ))}
    </div>
  )
}

export default Search