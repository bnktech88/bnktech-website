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
    <section className="py-12 bg-neutral-50 border-b border-neutral-200">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={cn(
                'px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 magnetic',
                selectedFilter === filter
                  ? 'bg-primary-900 text-neutral-50 shadow-lg shadow-primary-900/20'
                  : 'bg-neutral-100 text-primary-600 hover:bg-accent-50 hover:text-accent-700 border border-neutral-200'
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
