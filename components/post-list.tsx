"use client"

import { PostCard } from "@/components/post-card"

// Mock data - Replace with API calls
const mockPosts = [
  {
    id: 1,
    title: "Welcome to our new forum platform!",
    content:
      "We are excited to announce the launch of our new forum. Share your thoughts and connect with the community.",
    author: "admin",
    category: "technology",
    likes: 42,
    dislikes: 2,
    comments: 15,
    createdAt: "2 hours ago",
    isLiked: false,
    isDisliked: false,
  },
  {
    id: 2,
    title: "Best gaming setup for 2024?",
    content: "Looking for recommendations on building a gaming PC. What components would you suggest?",
    author: "gamer_pro",
    category: "gaming",
    likes: 28,
    dislikes: 3,
    comments: 24,
    createdAt: "5 hours ago",
    isLiked: false,
    isDisliked: false,
  },
  {
    id: 3,
    title: "New album recommendations",
    content: "Drop your favorite albums of the year. I am looking for new music to listen to!",
    author: "music_lover",
    category: "music",
    likes: 17,
    dislikes: 1,
    comments: 8,
    createdAt: "1 day ago",
    isLiked: false,
    isDisliked: false,
  },
]

export function PostList() {
  return (
    <div className="space-y-4">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
