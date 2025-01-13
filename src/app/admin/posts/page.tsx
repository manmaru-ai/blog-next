'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/posts`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(
        `Failed to fetch posts: ${res.status} ${res.statusText}${
          errorData.error ? ` - ${errorData.error}` : ''
        }`
      )
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function fetchPosts() {
    try {
      setIsLoading(true)
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeletePost(postId: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/posts/${postId}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(
          `Failed to delete post: ${res.status} ${res.statusText}${
            errorData.error ? ` - ${errorData.error}` : ''
          }`
        )
      }

      toast.success('記事を削除しました')
      // 削除後にリストを更新
      await fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error(error instanceof Error ? error.message : '記事の削除に失敗しました')
    }
  }

  // 初回レンダリング時にデータを取得
  useState(() => {
    fetchPosts()
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">エラーが発生しました</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">記事管理</h1>
        <Link href="/admin/posts/new">
          <Button>新規作成</Button>
        </Link>
      </div>
      
      <div className="grid gap-4">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div className="flex gap-2 mb-2">
                  {post.categories.map((pc: any) => (
                    <Badge key={pc.category.id} variant="secondary">
                      {pc.category.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">
                  作成日: {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/posts/${post.id}`}>
                  <Button variant="outline" size="sm">編集</Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDeletePost(post.id)}
                >
                  削除
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 