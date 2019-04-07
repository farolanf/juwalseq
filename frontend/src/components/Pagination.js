import React, { useState, useEffect } from 'react'
import { createPages } from '$lib/pagination'

const PageItem = ({ item, onClick }) => {
  const title = item.title === 'prev' 
    ? <i className='fa fa-angle-left' /> 
    : item.title === 'next' ? <i className='fa fa-angle-right' /> : item.title

  const arrow = item.title === 'prev' || item.title === 'next'

  return item.static 
    ? (
      <span>{title}</span>
    ) : (
      <button className={cn('btn btn-primary btn-sm', arrow && 'hidden md:block')} onClick={onClick} disabled={item.disabled}>
        {title}
      </button>
    )
}

const Pagination = ({ currentPage, totalPages, leadCount = 1, onChange }) => {
  const [pages, setPages] = useState([])

  const onClickItem = num => () => onChange(num)

  useEffect(() => {
    const last = totalPages
    const prev = currentPage > 1 && currentPage - 1
    const next = currentPage < last && currentPage + 1
    setPages(createPages({ currentPage, last, prev, next, leadCount }))
  }, [currentPage, totalPages])

  return (
    <div className='list-x-2'>
      {pages.map((page, i) => (
        <PageItem key={i} item={page} onClick={page.num ? onClickItem(page.num) : undefined} />
      ))}
    </div>
  )
}

export default Pagination