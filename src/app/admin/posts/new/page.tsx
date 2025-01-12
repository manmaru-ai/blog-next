import PostForm from '@/components/post-form'

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export default async function NewPostPage() {
  const categories = await getCategories()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">新規記事作成</h1>
        <PostForm categories={categories} />
      </div>
    </main>
  )
} 