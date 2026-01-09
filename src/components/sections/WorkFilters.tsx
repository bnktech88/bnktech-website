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
    <section className="py-12 bg-bnk-bronze border-b border-bnk-navy">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={cn(
                'px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 magnetic',
                selectedFilter === filter
                  ? 'bg-navy text-gold'
                  : 'bg-cream text-navy hover:bg-navy hover:text-gold border border-navy'
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
