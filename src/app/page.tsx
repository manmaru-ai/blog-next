import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Clock3Icon } from 'lucide-react'

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/posts`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export default async function Home() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {/* カテゴリーリスト */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category: any) => (
            <Badge key={category.id} variant="secondary" className="px-3 py-1">
              {category.name}
            </Badge>
          ))}
        </div>

        {/* 記事一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                {/* アイキャッチ画像 */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.coverImageURL || '/default-cover.png'}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* 記事情報 */}
                <div className="p-4 flex-grow flex flex-col">
                  {/* カテゴリーバッジ */}
                  <div className="flex gap-2 mb-3">
                    {post.categories?.map((category: any) => (
                      <Badge 
                        key={category.id} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* タイトル */}
                  <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  {/* 日付 */}
                  <div className="text-sm text-gray-500 mt-auto">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
