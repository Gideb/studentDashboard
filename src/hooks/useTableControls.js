import { useEffect, useMemo, useState } from 'react'

const useTableControls = ({
  data,
  searchableFields = [],
  itemsPerPage = 5,
  resetDependencies = [],
}) => {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(searchableFields[0] || '')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)

  // -----------------------------
  // Search
  // -----------------------------

  const filteredData = useMemo(() => {
    const searchValue = search.toLowerCase().trim()

    if (!searchValue) {
      return data
    }

    return data.filter(item =>
      searchableFields.some(field => String(item[field]).toLowerCase().includes(searchValue))
    )
  }, [data, search, searchableFields])

  // -----------------------------
  // Sorting
  // -----------------------------

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valueA = a[sortBy]
      let valueB = b[sortBy]

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1
      }

      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1
      }

      return 0
    })
  }, [filteredData, sortBy, sortOrder])

  // -----------------------------
  // Pagination
  // -----------------------------

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedData = sortedData.slice(startIndex, endIndex)

  // -----------------------------
  // Reset page
  // -----------------------------

  useEffect(() => {
    setCurrentPage(1)
  }, [search, sortBy, sortOrder, ...resetDependencies])

  // -----------------------------
  // Prevent invalid page
  // -----------------------------

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1)
      return
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // -----------------------------
  // Page numbers
  // -----------------------------

  const pageNumbers = useMemo(() => {
    const pages = []

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page)
      }

      return pages
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }, [totalPages, currentPage])

  return {
    search,
    setSearch,

    filteredData,
    sortedData,
    paginatedData,

    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    currentPage,
    setCurrentPage,

    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
  }
}

export default useTableControls
