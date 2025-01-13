import { notFound } from 'next/navigation'
import PostForm from '@/components/post-form'

async function getPost(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/posts/${id}`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error('Failed to fetch post')
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    if (!res.ok) throw new Error('Failed to fetch categories')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  try {
    const id = params.id
    const [post, categories] = await Promise.all([
      getPost(id),
      getCategories()
    ])

    if (!post) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">記事の編集</h1>
          <PostForm
            categories={categories}
            initialData={{
              id: post.id,
              title: post.title,
              content: post.content,
              coverImageURL: post.coverImageURL,
              categories: post.categories.map((pc: any) => ({
                categoryId: pc.category.id
              }))
            }}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in EditPostPage:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">エラーが発生しました</h2>
          <p className="text-red-600">記事の読み込みに失敗しました。</p>
        </div>
      </div>
    )
  }
} 