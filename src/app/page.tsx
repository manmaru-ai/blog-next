import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getPosts() {
  const res = await fetch(`http://localhost:3000/api/posts`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

async function getCategories() {
  const res = await fetch(`http://localhost:3000/api/categories`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export default async function Home() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダーナビゲーション */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">ブログ</h1>
          <nav className="space-x-2">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
          </nav>
        </div>
        
        {/* 管理者メニュー */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">管理者メニュー</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/posts">
              <Button variant="outline" size="sm">記事管理</Button>
            </Link>
            <Link href="/admin/posts/new">
              <Button variant="outline" size="sm">記事作成</Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline" size="sm">カテゴリー管理</Button>
            </Link>
            <Link href="/admin/categories/new">
              <Button variant="outline" size="sm">カテゴリー作成</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex gap-8">
        {/* メインコンテンツ */}
        <div className="flex-grow">
          <div className="grid gap-8">
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {post.coverImageURL && (
                  <img
                    src={post.coverImageURL}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-gray-900 hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="text-sm text-gray-500 mb-4">
                    <span>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</span>
                    <span className="mx-2">|</span>
                    <span>{post.categories.map((pc: any) => pc.category.name).join(', ')}</span>
                  </div>
                  <p className="text-gray-700 line-clamp-3">{post.content}</p>
                  <Link
                    href={`/posts/${post.id}`}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                  >
                    続きを読む →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* サイドバー */}
        <div className="w-64">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">カテゴリー</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600"
                >
                  全て
                </Link>
              </li>
              {categories.map((category: any) => (
                <li key={category.id}>
                  <Link
                    href={`/?categoryId=${category.id}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
