'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const filters = [
  'All Projects',
  'Website Build'
]

interface WorkFiltersProps {
  activeFilter?: string
  onFilterChange?: (filter: string) => void
}

export default function WorkFilters({ 
  activeFilter = 'All Projects', 
  onFilterChange 
}: WorkFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState(activeFilter)

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter)
    onFilterChange?.(filter)
  }

  return (
    <section className="py-12 bg-white border-b border-grey-200">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={cn(
                'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 magnetic',
                selectedFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
