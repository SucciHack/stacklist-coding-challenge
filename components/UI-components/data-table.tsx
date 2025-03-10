"use client"

import { useState } from "react"
import { Lock, MoreHorizontal } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ViewMode } from "./filter-bar"
import { ItemCard } from "./item-card"

interface Item {
  id: string
  title: string
  notes: string
  date: string
  likes: number
  status: "Private" | "Public" | "Shared"
}

const initialItems: Item[] = [
  {
    id: "1",
    title: "Shop 50 Inch Smart Android LED TV 4K Ultra HD Google...",
    notes: "Shop 50 Inch Smart Android LED TV 4K Ultra HD Google...",
    date: "March 10, 2025",
    likes: 0,
    status: "Private",
  },
  {
    id: "2",
    title: "Wireless Bluetooth Headphones Noise Cancelling Over-Ear",
    notes: "Premium wireless headphones with active noise cancellation and 30-hour battery life",
    date: "March 9, 2025",
    likes: 5,
    status: "Public",
  },
  {
    id: "3",
    title: "Smart Home Security Camera System with Night Vision",
    notes: "Indoor/outdoor security cameras with motion detection and cloud storage",
    date: "March 8, 2025",
    likes: 2,
    status: "Shared",
  },
  {
    id: "4",
    title: "Ergonomic Office Chair with Lumbar Support",
    notes: "Adjustable height and armrests with breathable mesh back for comfort",
    date: "March 7, 2025",
    likes: 8,
    status: "Private",
  },
]

interface DataTableProps {
  viewMode: ViewMode
}

export function DataTable({ viewMode }: DataTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<Item[]>(initialItems)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  if (viewMode === "grid") {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onToggleSelect={toggleSelectItem}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">
              <Checkbox
                checked={selectedItems.length === items.length && items.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </th>
            <th className="p-3 text-left font-medium text-muted-foreground">Title</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Notes</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Date</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Likes</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleSelectItem(item.id)}
                  aria-label={`Select ${item.title}`}
                />
              </td>
              <td className="p-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
                  <span className="text-xs">S</span>
                </div>
                <span className="font-medium">{item.title}</span>
              </td>
              <td className="p-3 text-muted-foreground">{item.notes}</td>
              <td className="p-3 text-muted-foreground">{item.date}</td>
              <td className="p-3 text-muted-foreground">{item.likes}</td>
              <td className="p-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  {item.status}
                </div>
              </td>
              <td className="p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

