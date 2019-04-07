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
      <div className='h-full flex flex-col items-center border border-solid border-grey-lighter shadow hover:shadow-md p-1'>
        <div style={{ backgroundImage: thumbnail && `url(${thumbnail.url})`, height: '60%' }} className={cn('w-full bg-contain bg-center bg-no-repeat mb-2', !thumbnail && 'border border-solid border-grey-lighter bg-grey-lightest')} />
        <div className='text-center md:text-sm px-1'>{hit._source.name}</div>
        <div className='flex-grow w-full flex justify-end items-end pr-2 pb-1 text-green md:text-sm'>Rp {price}</div>
      </div>
    </a>
  )
}

const ProductList = ({ results, currentPage, totalPages, onChangePage }) => {
  return (
    <div className='flex flex-col content mx-auto'>
      <div className='flex flex-col md:flex-row md:flex-wrap mb-2'>
        {results && results.hits.hits.map((hit, i) => (
          <Product hit={hit} key={i} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onChangePage} />
    </div>
  )
}

const Search = () => {
  const pageSize = 15

  const { product } = useStore()
  const [page, setPage] = useState(1)

  const handleChangePage = num => {
    setPage(num)
  }

  useEffect(() => {
    product.searchProducts({
      count: pageSize,
      offset: (page - 1) * pageSize,
    })
  }, [page])

  const totalPages = product.results ? Math.ceil(product.results.hits.total / pageSize) : 0

  return (
    <div>
      <Filter />
      <ProductList results={product.results} currentPage={page} totalPages={totalPages} onChangePage={handleChangePage} />
    </div>
  )
}

export default observer(Search)