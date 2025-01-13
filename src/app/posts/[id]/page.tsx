import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

async function getPost(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/posts/${id}`, {
      cache: 'no-store'
    })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error('Failed to fetch post')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 記事コンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* カバー画像 */}
          {post.coverImageURL && (
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <img
                src={post.coverImageURL}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* 記事ヘッダー */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
              </div>
              <div className="flex gap-2">
                {post.categories.map((pc: any) => (
                  <Badge key={pc.category.id} variant="secondary">
                    {pc.category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* 記事本文 */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg prose-pre:bg-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  )
} 