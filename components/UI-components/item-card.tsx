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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ItemCardProps {
  item: {
    id: string
    title: string
    notes: string
    date: string
    likes: number
    status: "Private" | "Public" | "Shared"
  }
  isSelected: boolean
  onToggleSelect: (id: string) => void
}

export function ItemCard({ item, isSelected, onToggleSelect }: ItemCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(item.id)}
            aria-label={`Select ${item.title}`}
          />
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
            <span className="text-xs">S</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
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
      </CardHeader>
      <CardContent>
        <h3 className="font-medium line-clamp-2">{item.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{item.notes}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">{item.date}</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{item.likes}</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            {item.status}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

