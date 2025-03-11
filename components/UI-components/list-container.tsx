'use client'
import React, { useState } from 'react'
import { FilterBar, ViewMode } from './filter-bar'
import { DataTable } from './data-table'

export default function ListContainer() {
    const [viewMode, setViewMode] = useState<ViewMode>("grid")
  return (
    <main className="flex-1 dark:bg-black/50 dark:text-white scrollbar-hidden">
        <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
        <DataTable viewMode={viewMode} />
      </main>
  )
}
