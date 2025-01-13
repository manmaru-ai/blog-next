import { Suspense } from 'react'
import CategoryManager from '@/components/category-manager'

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">カテゴリー管理</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryManager />
        </Suspense>
      </div>
    </div>
  )
} 