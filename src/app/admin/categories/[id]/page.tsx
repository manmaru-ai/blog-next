import { notFound } from 'next/navigation'
import CategoryForm from '@/components/category-form'

type PageProps = {
  params: {
    id: string
  }
}

async function getCategory(id: string) {
  const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Failed to fetch category')
  }
  return res.json()
}

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const category = await getCategory(id)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">カテゴリの編集</h1>
      <CategoryForm category={category} />
    </div>
  )
} 