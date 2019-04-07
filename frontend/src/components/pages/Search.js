import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import useStore from '$useStore'

import Pagination from '$comp/Pagination'

const Filter = () => {
  return (
    <div className='sidebar bg-white border border-solid border-grey mb-2 md:mb-0 md:sticky md:pin-t md:float-left'>
      Filters
    </div>
  )
}

const Product = ({ hit }) => {
  const thumbnail = hit._source.images.find(item => item.url.match(/\.xs\./))
  const price = Intl.NumberFormat().format(hit._source.price)
  return (
    <a className='product-card h-64 pb-2 md:pr-2 cursor-pointer link-reset'>
      <div className='h-full flex flex-col items-center border border-solid border-grey-lighter shadow'>
        <div style={{ backgroundImage: thumbnail && `url(${thumbnail.url})`, height: '60%' }} className={cn('w-full bg-contain bg-center bg-no-repeat mb-2', !thumbnail && 'border border-solid border-grey-lighter bg-grey-lightest')} />
        <h5 className='md:hidden text-center'>{hit._source.name}</h5>
        <h6 className='hidden md:block text-center'>{hit._source.name}</h6>
        <div className='flex-grow w-full flex justify-end items-end pr-3 pb-2'>Rp {price}</div>
      </div>
    </a>
  )
}

const ProductList = ({ results }) => {
  const [page, setPage] = useState(1)

  const handleChangePage = num => {
    setPage(num)
  }

  return (
    <div className='flex flex-col content mx-auto'>
      <div className='flex flex-col md:flex-row md:flex-wrap mb-2'>
        {results && results.hits.hits.map(hit => (
          <Product hit={hit} key={hit._id} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={20} onChange={handleChangePage} />
    </div>
  )
}

const Search = () => {
  const { product } = useStore()

  useEffect(() => {
    product.searchProducts({})
  }, [])

  return (
    <div>
      <Filter />
      <ProductList results={product.results} />
    </div>
  )
}

export default observer(Search)