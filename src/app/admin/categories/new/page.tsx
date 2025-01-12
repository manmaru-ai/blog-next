import CategoryForm from '@/components/category-form'

export default function NewCategoryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">新規カテゴリー作成</h1>
        <CategoryForm />
      </div>
    </main>
  )
} 