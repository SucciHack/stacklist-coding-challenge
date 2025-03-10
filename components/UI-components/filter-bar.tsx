"use client"

import { useState } from "react"
import { ChevronDown, LayoutGrid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ViewMode = "grid" | "list"

interface FilterBarProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export function FilterBar({ viewMode, setViewMode }: FilterBarProps) {
  const [sortBy, setSortBy] = useState("Recent")

  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Sort by: {sortBy}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setSortBy("Recent")}>Recent</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Oldest")}>Oldest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Name (A-Z)")}>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Name (Z-A)")}>Name (Z-A)</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Filter By
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Date Created</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Category</DropdownMenuItem>
              <DropdownMenuItem>Priority</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Apply Tags
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Available Tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Work</DropdownMenuItem>
              <DropdownMenuItem>Personal</DropdownMenuItem>
              <DropdownMenuItem>Important</DropdownMenuItem>
              <DropdownMenuItem>Urgent</DropdownMenuItem>
              <DropdownMenuItem>Shopping</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="icon"
          onClick={() => setViewMode("grid")}
          className="h-9 w-9"
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="sr-only">Grid view</span>
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="icon"
          onClick={() => setViewMode("list")}
          className="h-9 w-9"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">List view</span>
        </Button>
      </div>
    </div>
  )
}

