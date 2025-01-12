'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const categorySchema = z.object({
  name: z.string().min(1, '必須項目です')
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category?: {
    id: string
    name: string
  }
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
  })

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const url = category
        ? `/api/admin/categories/${category.id}`
        : '/api/admin/categories'
      const method = category ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to save category')
      }

      router.push('/admin/categories')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'エラーが発生しました')
    }
  }

  const handleDelete = async () => {
    if (!category || !confirm('本当に削除しますか？')) return

    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete category')

      router.push('/admin/categories')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('エラーが発生しました')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          カテゴリー名
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '保存中...' : '保存'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            キャンセル
          </Button>
        </div>
        {category && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            削除
          </Button>
        )}
      </div>
    </form>
  )
} 