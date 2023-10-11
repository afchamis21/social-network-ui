'use client'

import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface PageControllerProps {
  lastPage: number
  currentPage: number
  maxPages: number
  isLoading: boolean

  handlePreviousPage: () => void
  handleNextPage: () => void
  handleSpecificPage: (target: number) => void
}

export function PageController({
  currentPage,
  lastPage,
  maxPages,
  isLoading,
  handlePreviousPage,
  handleSpecificPage,
  handleNextPage,
}: PageControllerProps) {
  function calculateTotalPages() {
    const remainingPages = lastPage - currentPage

    if (lastPage < maxPages) {
      return [...Array(lastPage)].map((_, i) => i)
    }

    if (remainingPages < maxPages) {
      return [...Array(lastPage)]
        .map((_, i) => i + currentPage)
        .slice(-maxPages)
    }

    return [...Array(maxPages)].map((_, i) => i + currentPage)
  }

  const pages = calculateTotalPages()

  return (
    <div className={'flex justify-center gap-2'}>
      <button
        className={
          'hover:text-rose-800 transition-colors disabled:text-gray-900 disabled:cursor-not-allowed disabled:opacity-70'
        }
        disabled={currentPage === 0 || isLoading}
        onClick={handlePreviousPage}
      >
        <CaretLeft size={18} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={
            'w-6 h-6 rounded border-2 flex items-center justify-center ' +
            'hover:border-rose-800 transition-colors disabled:cursor-not-allowed ' +
            (page === currentPage
              ? 'border-rose-800 bg-rose-800 text-gray-100'
              : 'border-gray-700')
          }
          disabled={page === currentPage || isLoading}
          onClick={() => handleSpecificPage(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className={
          'hover:text-rose-800 transition-colors disabled:text-gray-900 disabled:cursor-not-allowed disabled:opacity-70'
        }
        disabled={currentPage + 1 === lastPage || isLoading}
        onClick={handleNextPage}
      >
        <CaretRight size={18} />
      </button>
    </div>
  )
}
