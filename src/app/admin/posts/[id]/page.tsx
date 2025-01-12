import { notFound } from 'next/navigation'
import PostForm from '@/components/post-form'

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Failed to fetch post')
  }
  return res.json()
}

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

interface PageProps {
  params: { id: string }
}

export default async function EditPostPage({ params }: PageProps) {
  const [post, categories] = await Promise.all([
    getPost(params.id),
    getCategories()
  ])

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">記事の編集</h1>
        <PostForm post={post} categories={categories} />
      </div>
    </main>
  )
} 