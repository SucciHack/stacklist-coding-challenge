"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "./logo"

export function NavBar() {
  const [activeTab, setActiveTab] = useState("Cards")
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-8">
        <Logo />
        <nav className="flex items-center gap-6">
          <Link
            href="#"
            className={`relative font-medium ${
              activeTab === "Cards" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("Cards")}
          >
            Cards
            {activeTab === "Cards" && (
              <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-brand-purple" />
            )}
          </Link>
          <Link
            href="#"
            className={`relative font-medium ${
              activeTab === "Stacks" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("Stacks")}
          >
            Stacks
            {activeTab === "Stacks" && (
              <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-brand-purple" />
            )}
          </Link>
          <Link
            href="#"
            className={`relative font-medium ${
              activeTab === "Discover" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("Discover")}
          >
            Discover
            <span className="ml-1 inline-flex items-center justify-center rounded-full bg-brand-purple px-1.5 py-0.5 text-xs text-white">
              +
            </span>
            {activeTab === "Discover" && (
              <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-brand-purple" />
            )}
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Find a card"
            className="pl-8 pr-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
        <Button size="icon" className="rounded-full bg-brand-purple hover:bg-brand-purpleDark">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add new</span>
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

