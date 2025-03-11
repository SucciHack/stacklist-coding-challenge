"use client"

import { useEffect, useState } from "react"
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
import { useProducts } from "@/hooks/productHook"
import Image from "next/image"


interface Item {
  id: string
  title: string
  notes: string
  image:string
  date: string
  likes: number
  status: "Private" | "Public" | "Shared"
}

interface DataTableProps {
  viewMode: ViewMode
}

export function DataTable({ viewMode }: DataTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const { products, isLoading, error } = useProducts() 
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    if (products) {
      const transformedProducts: Item[] = products.map((product) => ({
        id: product.id,
        title: product.title,
        notes: product.url,
        image:product.imageUrl,
        date: new Date(product.createdAt).toLocaleDateString(),
        likes: 0, // Assuming likes are not part of the product schema
        status: "Public", // Assuming status is not part of the product schema
      }))
      setItems(transformedProducts)
    }
  }, [products])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading products</div>
  }

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
                <Image src={item.image} alt="image" width={300} height={300} className="max-w-16 max-h-16 object-cover object-center"/>
                <span className="font-medium line-clamp-1">{item.title}</span>
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

