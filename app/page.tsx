import { Header } from "@/components/header"
import { CategoryFilter } from "@/components/category-filter"
import { PostList } from "@/components/post-list"
import { CreatePostButton } from "@/components/create-post-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Forum Discussions</h1>
            <p className="mt-2 text-muted-foreground">Join the conversation, share your thoughts</p>
          </div>
          <CreatePostButton />
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <CategoryFilter />
          </aside>

          <div className="lg:col-span-3">
            <PostList />
          </div>
        </div>
      </main>
    </div>
  )
}
