import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getPosts() {
  const res = await fetch(`http://localhost:3000/api/posts`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default async function AdminPostsPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">記事一覧</h1>
        <Link href="/admin/posts/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                タイトル
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                カテゴリー
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                作成日
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                更新日
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">編集</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {post.categories.map((pc: any) => pc.category.name).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {new Date(post.updatedAt).toLocaleDateString('ja-JP')}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    編集
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 