import { notFound } from 'next/navigation'
import PostForm from '@/components/post-form'

type PageProps = {
  params: { id: string }
}

async function getPost(id: string) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Failed to fetch post')
  }
  return res.json()
}

async function getCategories() {
  const res = await fetch(`http://localhost:3000/api/categories`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export default async function EditPostPage(context: PageProps) {
  const [post, categories] = await Promise.all([
    getPost(context.params.id),
    getCategories()
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">記事の編集</h1>
      <PostForm post={post} categories={categories} />
    </div>
  )
} 