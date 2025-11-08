"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Filter, Home, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "All Posts", icon: Home },
  { id: "technology", name: "Technology", color: "bg-blue-500/10 text-blue-500" },
  { id: "gaming", name: "Gaming", color: "bg-green-500/10 text-green-500" },
  { id: "music", name: "Music", color: "bg-purple-500/10 text-purple-500" },
  { id: "sports", name: "Sports", color: "bg-orange-500/10 text-orange-500" },
  { id: "art", name: "Art & Design", color: "bg-pink-500/10 text-pink-500" },
]

const userFilters = [
  { id: "my-posts", name: "My Posts", icon: User, requiresAuth: true },
  { id: "liked", name: "Liked Posts", icon: Heart, requiresAuth: true },
]

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <h2 className="font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedFilter(null)
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                    selectedCategory === category.id && "bg-accent",
                  )}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : <div className={cn("h-2 w-2 rounded-full", category.color)} />}
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            My Activity
            <Badge variant="secondary" className="ml-2 text-xs">
              Login required
            </Badge>
          </h3>
          <div className="space-y-1">
            {userFilters.map((filter) => {
              const Icon = filter.icon
              return (
                <button
                  key={filter.id}
                  onClick={() => {
                    setSelectedFilter(filter.id)
                    setSelectedCategory("all")
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                    selectedFilter === filter.id && "bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{filter.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
