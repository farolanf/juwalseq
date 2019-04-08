import React, { useState, useEffect } from 'react'
import { observer, Observer } from 'mobx-react-lite'
import useStore from '$useStore'

import Pagination from '$comp/Pagination'
import Checkbox from '$comp/Checkbox'
import Collapse from '$comp/Collapse'
import Placeholder from '$comp/Placeholder';

import { createArray } from '$lib/helpers'

const FilterGroup = ({ title, count, expand = true, children }) => {
  const [show, setShow] = useState(expand)

  const handleClickTitle = () => setShow(!show)

  useEffect(() => {
    setShow(expand)
  }, [expand])

  return (
    <div className='mb-1'>
      <div className='text-sm text-grey-dark hover:text-grey-darker cursor-pointer' onClick={handleClickTitle}>
        <i className={cn('fa text-xs', show ? 'fa-minus' : 'fa-plus')} /> {title} ({count})
      </div>
      <Collapse show={show}>
        {children}
      </Collapse>
    </div>
  )
}

const CategoryFilter = ({ bucket, onChange }) => {
  const [expand, setExpand] = useState(false)
  return (
    <FilterGroup title={bucket.key} count={bucket.doc_count} expand={expand}>
      {bucket.category.name.buckets.map(category => (
        <Observer key={bucket.key + category.key}>
          {() => {
            const { product } = useStore()
            const item = product.filters.categories.find(val => val === category.key)
            if (item) setExpand(true)
            return (
              <Checkbox label={`${category.key} (${category.doc_count})`} id={bucket.key + category.key} onChange={e => onChange(bucket.key, category.key, e.target.checked)} value={!!item} />
            )
          }}
        </Observer>
      ))}
    </FilterGroup>
  )
}

const AttributeFilter = ({ bucket, onChange }) => (
  <FilterGroup title={bucket.key} count={bucket.doc_count}>
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
  </FilterGroup>
)

const Filter = ({ results }) => {
  const { product } = useStore()

  const hits = results && results.hits && !!results.hits.total && results.hits.hits

  const handleChangeCategory = (department, category, enable) => {
    if (enable) {
      product.addCategory(category)
    } else {
      product.removeCategory(category)
    }
  }

  const handleChangeAttribute = (attr, val, enable) => {
    enable ? product.addAttribute(attr, val) : product.removeAttribute(attr, val)
  }

  return (
    <div className='sidebar mb-2 pr-2 md:mb-0 md:float-left' style={{ top: 8 }}>
      {hits && results.aggregations.all.search.departments.name.buckets.map(bucket => (
        <CategoryFilter key={bucket.key} bucket={bucket} onChange={handleChangeCategory} />
      ))}
      {hits && results.aggregations.all.search.attributes.name.buckets.map(bucket => (
        <AttributeFilter key={bucket.key} bucket={bucket} onChange={handleChangeAttribute} />
      ))}
      {!hits && <Placeholder numLines={20} />}
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
  const from = Math.min((currentPage - 1) * pageSize + 1, total)
  const to = Math.min((currentPage - 1) * pageSize + pageSize + 1, total)
  const hits = results && results.hits && !!results.hits.total && results.hits.hits
  return (
    <div className='flex flex-col content'>
      <div className='text-grey text-xs mb-1'>{from} - {to} / {total}</div>
      <div className='flex flex-col md:flex-row md:flex-wrap mb-2'>
        {hits && hits.map((hit, i) => (
          <Product hit={hit} key={i} />
        ))}
        {!hits && createArray(15).map((v, i) => <Placeholder key={i} card className='product-card h-64' />)}
      </div>
      <div className='flex flex-col md:flex-row md:justify-between'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onChangePage} />
      </div>
    </div>
  )
}

const SearchBox = observer(() => {
  const [query, setQuery] = useState('')
  const { product } = useStore()

  const handleChangeQuery = e => setQuery(e.target.value)

  const handleSubmitQuery = e => {
    e.preventDefault()
    product.setQuery(query)
    product.tick()
    setQuery('')
  }

  return (
    <div className='mb-2'>
      <div className='list-y-2 md:list-x-1 md:items-center'>
        <div className='form-control flex-grow'>
          <input className='input input-sm' placeholder='Kota' />
        </div>
        <div className='form-control flex-grow'>
          <input className='input input-sm' placeholder='Kategori' />
        </div>
        <form className='flex-grow' onSubmit={handleSubmitQuery}>
          <div className='form-control'>
            <span className='fa fa-search input-prefix px-3' />
            <input className='input input-sm pl-9' placeholder='Cari...' value={query} onChange={handleChangeQuery} />
          </div>
        </form>
      </div>
      {product.q && (
        <div className='text-xs text-grey-dark'>
          <div>
            {product.loading ? (
              <div>
                Mencari <b className='text-grey-darkest'>{product.q}</b>... <i className='fa fa-spinner fa-pulse text-sm' />
              </div>
            ) : (
              !product.results || !product.results.hits.total ? (
                <div>
                  <b className='text-grey-darkest'>{product.q}</b> <span className='text-red'>tidak ditemukan</span>
                </div>
              ) : (
                <div>
                  <b className='text-grey-darkest'>{product.q}</b> ditemukan dalam {product.results.took} ms
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
})

const Search = () => {
  const { product } = useStore()

  product.doSearchProducts

  useEffect(() => {
    product.clearFilters()
  }, [])

  const handleChangePage = num => {
    product.setPage(num)
  }

  const totalPages = product.results ? Math.ceil(product.results.hits.total / product.pageSize) : 0

  return (
    <div className='main mx-auto'>
      <SearchBox />
      <Filter results={product.results} />
      <ProductList results={product.results} pageSize={product.pageSize} currentPage={product.page} totalPages={totalPages} onChangePage={handleChangePage} />
    </div>
  )
}

export default observer(Search)