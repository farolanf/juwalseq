import React, { useState, useEffect } from 'react'
import { reaction } from 'mobx'
import { observer, Observer } from 'mobx-react-lite'

import useStore from '$useStore'

import Pagination from '$comp/Pagination'
import Checkbox from '$comp/Checkbox'
import Collapse from '$comp/Collapse'
import Placeholder from '$comp/Placeholder';

import { createArray } from '$lib/helpers'
import { queryString } from '$lib/location'

const FilterGroup = ({ title, count, expand = true, children }) => {
  const [show, setShow] = useState(expand)

  const handleClickTitle = () => setShow(!show)

  useEffect(() => {
    setShow(expand)
  }, [expand])

  return (
    <div className='mb-1'>
      <div className='text-xs text-grey-darker hover:text-grey-darkest cursor-pointer' onClick={handleClickTitle}>
        <i className={cn('fa text-xs', show ? 'fa-minus' : 'fa-plus')} /> {title} ({count})
      </div>
      <Collapse show={show}>
        {children}
      </Collapse>
    </div>
  )
}

const RegionFilter = observer(({ bucket, onChange }) => {
  const [expand, setExpand] = useState(false)
  const { product, region } = useStore()
  const provinsiName = region.provinsis[bucket.key] && region.provinsis[bucket.key].name || bucket.key
  const provinsiSelected = !!product.filters.provinsi.find(x => x == bucket.key)
  const kabupatenBuckets = _.get(product.results, 'aggregations.kabupaten.buckets', []).filter(kabBucket => region.getKabupaten(bucket.key, kabBucket.key))
  !expand && provinsiSelected && setExpand(true)  

  return (
    <FilterGroup title={provinsiName} count={bucket.doc_count} expand={expand}>
      <Checkbox label={`Seluruh ${provinsiName} (${bucket.doc_count})`} id={`region-${bucket.key}`} onChange={() => onChange(bucket.key, undefined, !provinsiSelected)} value={provinsiSelected} className='text-xs' />
      {kabupatenBuckets && kabupatenBuckets.map(kabBucket => {
        const id = `region-${bucket.key}-${kabBucket.key}`
        const kabupaten = region.getKabupaten(bucket.key, kabBucket.key)
        const kabSelected = !!product.filters.kabupaten.find(x => x == kabBucket.key)
        !expand && kabSelected && setExpand(true)
        return (
          <Checkbox key={id} label={`${kabupaten && kabupaten.name} (${kabBucket.doc_count})`} id={id} onChange={e => onChange(bucket.key, kabBucket.key, e.target.checked)} value={kabSelected} className='text-xs' />
        )
      })}
    </FilterGroup>
  )
})

const CategoryFilter = observer(({ bucket, onChange }) => {
  const [expand, setExpand] = useState(false)
  const { product } = useStore()
  const departmentName = product.departments ? _.find(product.departments, { id: bucket.key }).name : bucket.key
  return (
    <FilterGroup title={departmentName} count={bucket.doc_count} expand={expand}>
      {bucket.categories.id.buckets.map(category => (
        <Observer key={`category-${bucket.key}-${category.key}`}>
          {() => {
            const categoryName = product.categories ? product.categories[category.key].name : category.key
            const selected = !!product.filters.categories.find(val => val == category.key)
            !expand && selected && setExpand(true)
            return (
              <Checkbox label={`${categoryName} (${category.doc_count})`} id={`category-${bucket.key}-${category.key}`} onChange={e => onChange(bucket.key, category.key, e.target.checked)} value={selected} className='text-xs' />
            )
          }}
        </Observer>
      ))}
    </FilterGroup>
  )
})

const PriceFilter = ({ onChangeNego, onChangePriceMin, onChangePriceMax }) => {
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const { product } = useStore()
  
  const min = _.get(product.results, 'aggregations.min_price.value')
  const max = _.get(product.results, 'aggregations.max_price.value')

  const handleChangePriceMin = e => setPriceMin(e.target.value)

  const handleChangePriceMax = e => setPriceMax(e.target.value)

  const handleSubmitPriceMin = e => {
    e.preventDefault()
    onChangePriceMin(priceMin || undefined)
  }

  const handleSubmitPriceMax = e => {
    e.preventDefault()
    onChangePriceMax(priceMax || undefined)
  }

  useEffect(() => {
    return reaction(
      () => [product.filters.priceMin, product.filters.priceMax],
      ([priceMin, priceMax]) => {
        setPriceMin(priceMin || '')
        setPriceMax(priceMax || '')
      }
    )
  }, [])

  return (<>
    <Checkbox label='Bisa nego' id='filter-nego' onChange={e => onChangeNego(e.target.checked)} value={product.filters.nego || false} indeterminate={product.filters.nego === undefined} className='text-xs' />
    <div className='flex items-center text-xs mb-1'>
      <label htmlFor='filter-price-min' className='w-6 mr-2 text-right'>Min</label>
      <form onSubmit={handleSubmitPriceMin} className='mb-0'>
        <input className='input input-xs w-24 text-right' placeholder={min} id='filter-price-min' type='number' min={0} max={max} value={priceMin} onChange={handleChangePriceMin} onBlur={handleSubmitPriceMin} />
      </form>
    </div>
    <div className='flex items-center text-xs'>
      <label htmlFor='filter-price-max' className='w-6 mr-2 text-right'>Max</label>
      <form onSubmit={handleSubmitPriceMax} className='mb-0'>
        <input className='input input-xs w-24 text-right' placeholder={max} id='filter-price-max' type='number' min={0} max={max} value={priceMax} onChange={handleChangePriceMax} onBlur={handleSubmitPriceMax} />
      </form>
    </div>
  </>)
}

const AttributeFilter = ({ bucket, onChange }) => {
  const { product, attribute } = useStore()
  const attr = attribute.attributes[bucket.key]
  return (
    <FilterGroup title={attr && attr.name} count={bucket.doc_count}>
      {bucket.valueId.buckets.map(value => (
        <Observer key={`attr-${bucket.key}-${value.key}`}>
          {() => {
            const attrValue = attr && attr.children && _.find(attr.children, { id: value.key })
            const exists = product.filters.attributes.find(attr => attr.id == bucket.key && attr.valueId == value.key)
            return (
              <Checkbox label={`${attrValue && attrValue.value} (${value.doc_count})`} id={`attr-${bucket.key}-${value.key}`} onChange={e => onChange(bucket.key, value.key, e.target.checked)} value={!!exists} className='text-xs' />
            )
          }}
        </Observer>
      ))}
    </FilterGroup>
  )
}

const Filter = ({ results }) => {
  const { product } = useStore()

  const hits = results && results.hits && !!results.hits.total && results.hits.hits

  const handleChangeRegion = (provinsi, kabupaten, enable) => {
    if (provinsi && kabupaten) {
      enable ? product.addKabupaten(kabupaten) : product.removeKabupaten(kabupaten)
    } else if (provinsi) {
      enable ? product.addProvinsi(provinsi) : product.removeProvinsi(provinsi)
    }
  }

  const handleChangeCategory = (department, category, enable) => {
    if (enable) {
      product.addCategory(category)
    } else {
      product.removeCategory(category)
    }
  }

  const handleChangeAttribute = (attrId, valueId, enable) => {
    enable ? product.addAttribute(attrId, valueId) : product.removeAttribute(attrId, valueId)
  }

  const handleChangeNego = enable => product.setNego(enable)
  
  const handleChangePriceMin = val => product.setPriceMin(val)

  const handleChangePriceMax = val => product.setPriceMax(val)

  return (
    <div className='sidebar mb-2 pr-2 md:mb-0 md:float-left' style={{ top: 8 }}>
      {hits && <div className='text-xs text-grey-darker'>Daerah</div>}
      {hits && results.aggregations.provinsi.buckets.map(bucket => (
        <RegionFilter key={bucket.key} bucket={bucket} onChange={handleChangeRegion} />
      ))}
      {hits && <div className='text-xs text-grey-darker mt-1'>Kategori</div>}
      {hits && results.aggregations.departments.id.buckets.map(bucket => (
        <CategoryFilter key={bucket.key} bucket={bucket} onChange={handleChangeCategory} />
      ))}
      {hits && (<>
        <div className='text-xs text-grey-darker mt-1'>Harga</div>
        <PriceFilter onChangeNego={handleChangeNego} onChangePriceMin={handleChangePriceMin} onChangePriceMax={handleChangePriceMax} />
      </>)}
      {hits && <div className='text-xs text-grey-darker mt-1'>Spek</div>}
      {hits && results.aggregations.attributes.id.buckets.map(bucket => (
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
        <div className='flex-grow w-full flex justify-end items-end pr-2 pb-1 text-green-dark font-bold md:text-sm'>Rp {price}</div>
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
      <div className='text-grey-darker text-xs mb-1'>{from} - {to} / {total}</div>
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

const FilterTag = ({ label, ...props }) => {
  return <span className='tag mb-2' {...props}>{label}</span>
}

const ActiveFilters = observer(() => {
  const { product, region, attribute } = useStore()

  const priceMin = Intl.NumberFormat().format(product.filters.priceMin)
  const priceMax = Intl.NumberFormat().format(product.filters.priceMax)

  const createHandleRemoveProvinsi = id => () => product.removeProvinsi(id)
  
  const createHandleRemoveKabupaten = id => () => product.removeKabupaten(id)

  const createHandleRemoveCategory = id => () => product.removeCategory(id)

  const createHandleRemoveAttribute = attr => () => product.removeAttribute(attr.id, attr.valueId)

  const handleRemoveNego = () => product.setNego()

  const handleRemovePriceMin = () => product.setPriceMin()

  const handleRemovePriceMax = () => product.setPriceMax()

  const handleReset = () => product.resetFilters()

  return (
    <fieldset className='border border-solid border-grey-lighter mb-2 relative' hidden={!product.hasFilters}>
      <legend className='ml-2 text-xs text-grey-dark'>Filter</legend>
      <span className='absolute pin-t pin-r mt-2 p-1 text-xs text-grey-dark hover:bg-grey-lightest cursor-pointer fa fa-remove' onClick={handleReset} />
      <div className='list-x-2 flex-wrap pt-2 pb-1 px-2'>
        {product.filters.provinsi.map(id => (
          <FilterTag label={_.get(region.provinsis, [id, 'name'])} key={`provinsi-${id}`} onClick={createHandleRemoveProvinsi(id)} />
        ))}
        {product.filters.kabupaten.map(id => (
          <FilterTag label={_.get(region.kabupatens, [id, 'name'])} key={`kabupaten-${id}`} onClick={createHandleRemoveKabupaten(id)} />
        ))}
        {product.filters.categories.map(id => (
          <FilterTag label={_.get(product.categories, [id, 'name'])} key={`category-${id}`} onClick={createHandleRemoveCategory(id)} />
        ))}
        {product.filters.attributes.map(attr => {
          const name = _.get(attribute.attributes, [attr.id, 'name'])
          const value = _.get(attribute.attributeValues, [attr.valueId, 'value'])
          const title = `${name}: ${value}`
          return (
            <FilterTag label={title} key={`attribute-${attr.id}-${attr.valueId}`} onClick={createHandleRemoveAttribute(attr)} />
          )
        })}
        {typeof product.filters.nego !== 'undefined' && (
          <FilterTag label={product.filters.nego ? 'Bisa nego' : 'Tidak nego'} key='nego' onClick={handleRemoveNego} />
        )}
        {typeof product.filters.priceMin !== 'undefined' && (
          <FilterTag label={`Harga min: ${priceMin}`} key='price-min' onClick={handleRemovePriceMin} />
        )}
        {typeof product.filters.priceMax !== 'undefined' && (
          <FilterTag label={`Harga max: ${priceMax}`} key='price-max' onClick={handleRemovePriceMax} />
        )}
      </div>
    </fieldset>
  )
})

const SearchBox = observer(() => {
  const [query, setQuery] = useState('')
  const { product } = useStore()

  const handleChangeQuery = e => setQuery(e.target.value)

  const handleSubmitQuery = e => {
    e.preventDefault()
    product.setQuery(query)
    setQuery('')
  }

  return (
    <div className='mb-2'>
      <div className='list-y-2 mb-2 md:mb-0 md:list-x-1'>
        <div className='form-control flex-grow'>
          <input className='input input-sm' placeholder='Kota' aria-label='Kota' />
        </div>
        <div className='form-control flex-grow'>
          <input className='input input-sm' placeholder='Kategori' aria-label='Kategori' />
        </div>
        <form className='flex-grow mb-0' onSubmit={handleSubmitQuery}>
          <div className='form-control'>
            <span className='fa fa-search input-prefix px-3' />
            <input className='input input-sm pl-9' placeholder='Cari...' value={query} onChange={handleChangeQuery} aria-label='Cari' />
          </div>
        </form>
      </div>
      <ActiveFilters />
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
  const { product, attribute, region } = useStore()

  product.doSearchProducts

  useEffect(() => {
    product.fetchDepartments()
    product.fetchCategories()
    product.clearFilters()

    region.fetchProvinsis()
    attribute.fetchAttributes()

    const disposeProvinsiReaction = reaction(
      () => [...(_.get(product.results, 'aggregations.provinsi.buckets') || [])],
      provinsis => region.fetchKabupatens(provinsis.map(x => x.key))
    )

    const disposeAttrReaction = reaction(
      () => [...(_.get(product.results, 'aggregations.attributes.id.buckets') || [])],
      attrs => attribute.fetchAttributeValues(attrs.map(x => x.key))
    )

    const handleRouteChange = () => {
      // init filters from query string
      queryString.withoutUpdate(query => product.initFromQuery(query))
    }
    handleRouteChange()

    // serialize filters to query string
    const disposeFilterReaction = reaction(
      () => [product.q, product.page, JSON.stringify(product.filters)],
      () => {
        queryString.update(query => {
          query.q = product.q ? product.q : undefined
          query.page = product.page
          Object.assign(query, product.filters)
        })
      })
    
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      disposeFilterReaction()
      disposeAttrReaction()
      disposeProvinsiReaction()
    }
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