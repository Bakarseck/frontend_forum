"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Post {
  id: number
  title: string
  content: string
  author: string
  category: string
  likes: number
  dislikes: number
  comments: number
  createdAt: string
  isLiked: boolean
  isDisliked: boolean
}

interface PostCardProps {
  post: Post
}

const categoryColors: Record<string, string> = {
  technology: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  gaming: "bg-green-500/10 text-green-500 border-green-500/20",
  music: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  sports: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  art: "bg-pink-500/10 text-pink-500 border-pink-500/20",
}

export function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState(initialPost)

  const handleLike = () => {
    // TODO: Connect to your Golang API
    // Example: POST /api/posts/:id/like

    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      isDisliked: false,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes,
    }))
  }

  const handleDislike = () => {
    // TODO: Connect to your Golang API
    // Example: POST /api/posts/:id/dislike

    setPost((prev) => ({
      ...prev,
      isDisliked: !prev.isDisliked,
      isLiked: false,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes + 1,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes,
    }))
  }

  return (
    <Card className="p-6 transition-shadow hover:shadow-lg">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn(categoryColors[post.category])}>
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{post.createdAt}</span>
            </div>
            <h3 className="text-xl font-semibold leading-tight text-balance">{post.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{post.content}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn("gap-2", post.isLiked && "text-green-500 hover:text-green-600")}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={cn("gap-2", post.isDisliked && "text-red-500 hover:text-red-600")}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{post.dislikes}</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
