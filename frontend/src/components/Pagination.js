import React from 'react'
import { createPages } from '$lib/pagination'

const PageItem = ({ item, currentPage, onClick }) => {
  const title = item.title === 'prev' 
    ? <i className='fa fa-angle-left' /> 
    : item.title === 'next' ? <i className='fa fa-angle-right' /> : item.title

  const arrow = item.title === 'prev' || item.title === 'next'

  const active = item.num === currentPage

  return item.static 
    ? (
      <span>{title}</span>
    ) : (
      <button className={cn('btn btn-sm', active && 'btn-primary', arrow && 'hidden md:block')} onClick={onClick} disabled={item.disabled}>
        {title}
      </button>
    )
}

const Pagination = ({ currentPage, totalPages, leadCount = 1, onChange }) => {
  const pages = createPages({ currentPage, totalPages, leadCount })

  const onClickItem = num => () => onChange(num)

  return (
    <div className='list-x-2'>
      {pages.map((page, i) => (
        <PageItem key={i} item={page} currentPage={currentPage} onClick={page.num ? onClickItem(page.num) : undefined} />
      ))}
    </div>
  )
}

export default Pagination