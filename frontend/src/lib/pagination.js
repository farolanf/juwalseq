export const contentRange = header => {
  const match = (header || '').match(/(\d+)-(\d+)\/(\d+)$/) || {}
  return {
    from: +match[1],
    to: +match[2],
    count: +match[3],
  }
}

export const createPages = ({ currentPage, totalPages, leadCount }) => {
  const last = totalPages
  const prev = currentPage > 1 && currentPage - 1
  const next = currentPage < last && currentPage + 1
  
  const pages = []
  
  pages.push({ title: 'prev', num: prev, disabled: currentPage === 1 })
  pages.push({ title: 'next', num: next, disabled: currentPage === last })

  currentPage !== 1 && pages.push({ title: '1', num: 1 })

  if (currentPage - leadCount > 2) {
    pages.push({ title: '...', static: true })
  }

  for (let i = Math.max(2, currentPage - leadCount); i < currentPage; i++) {
    pages.push({ title: i, num: i })
  }

  pages.push({ title: currentPage, num: currentPage, disabled: true, active: true })

  for (let i = currentPage + 1; i <= Math.min(currentPage + leadCount, last - 1); i++) {
    pages.push({ title: i, num: i })
  }

  if (currentPage + leadCount < last - 1) {
    pages.push({ title: '...', static: true })
  }

  currentPage !== last && pages.push({ title: last, num: last })
  return pages
}
