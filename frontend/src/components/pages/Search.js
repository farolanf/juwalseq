import React, { useState } from 'react'
import { observer, Observer } from 'mobx-react-lite'
import useStore from '$useStore'

import Pagination from '$comp/Pagination'
import Checkbox from '$comp/Checkbox'
import Collapse from '$comp/Collapse'

const FilterGroup = ({ bucket, onChange }) => {
  const [show, setShow] = useState(true)

  const handleClickTitle = () => setShow(!show)

  return (
    <div className='mb-1'>
      <div className='text-sm text-grey-dark hover:text-grey-darker cursor-pointer' onClick={handleClickTitle}>
        <i className={cn('fa text-xs', show ? 'fa-minus' : 'fa-plus')} /> {bucket.key}
      </div>
      <Collapse show={show}>
        {bucket.value.buckets.map(value => (
          <Observer key={bucket.key + value.key}>
            {() => {
              const { product } = useStore()
              const attr = _.find(product.filters.attributes, { name: bucket.key, value: value.key })
              return (
                <Checkbox label={`${value.key} (${value.doc_count})`} id={bucket.key + value.key} onChange={e => onChange(bucket.key, value.key, e.target.checked)} value={!!attr} />
              )
            }}
          </Observer>
        ))}
      </Collapse>
    </div>
  )
}

const Filter = ({ results }) => {
  const { product } = useStore()

  const onChange = (attr, val, enable) => {
    enable ? product.addAttribute(attr, val) : product.removeAttribute(attr, val)
  }

  return (
    <div className='sidebar mb-2 pr-2 md:mb-0 md:sticky md:float-left' style={{ top: 8 }}>
      {results && results.aggregations.all.search.attributes.name.buckets.map(bucket => (
        <FilterGroup key={bucket.key} bucket={bucket} onChange={onChange} />
      ))}
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

const ProductList = ({ results, pageSize, currentPage, totalPages, onChangePage }) => {
  const total = results && results.hits && results.hits.total || 0
  const from = (currentPage - 1) * pageSize + 1
  const to = Math.min((currentPage - 1) * pageSize + pageSize + 1, total)
  return (
    <div className='flex flex-col content'>
      <div className='text-grey text-xs mb-1'>{from} - {to} / {total}</div>
      <div className='flex flex-col md:flex-row md:flex-wrap mb-2'>
        {results && results.hits.hits.map((hit, i) => (
          <Product hit={hit} key={i} />
        ))}
      </div>
      <div className='flex flex-col md:flex-row md:justify-between'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onChangePage} />
      </div>
    </div>
  )
}

const Search = () => {
  const { product } = useStore()

  product.doSearchProducts

  const handleChangePage = num => {
    product.setPage(num)
  }

  const totalPages = product.results ? Math.ceil(product.results.hits.total / product.pageSize) : 0

  return (
    <div className='main mx-auto'>
      <Filter results={product.results} />
      <ProductList results={product.results} pageSize={product.pageSize} currentPage={product.page} totalPages={totalPages} onChangePage={handleChangePage} />
    </div>
  )
}

export default observer(Search)