import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">カテゴリー管理</h1>
          <Link href="/admin/categories/new">
            <Button>新規カテゴリー作成</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  カテゴリー名
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  記事数
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  作成日
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">編集</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category: any) => (
                <tr key={category.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category._count.posts}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Link
                      href={`/admin/categories/${category.id}`}
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
    </main>
  )
} 