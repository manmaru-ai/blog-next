'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface Category {
  id: string
  name: string
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // カテゴリー一覧を取得
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/categories`)
      if (!res.ok) throw new Error('Failed to fetch categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      toast.error('カテゴリーの取得に失敗しました')
    }
  }

  // 初回マウント時にカテゴリー一覧を取得
  useEffect(() => {
    fetchCategories()
  }, [])

  // カテゴリーを追加
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName }),
      })

      if (!res.ok) {
        throw new Error('Failed to create category')
      }

      toast.success('カテゴリーを作成しました')
      setNewCategoryName('')
      fetchCategories()
    } catch (error) {
      toast.error('カテゴリーの作成に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  // カテゴリーを削除
  const handleDelete = async (id: string) => {
    if (!confirm('このカテゴリーを削除してもよろしいですか？')) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/categories/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete category')
      }

      toast.success('カテゴリーを削除しました')
      fetchCategories()
    } catch (error) {
      toast.error('カテゴリーの削除に失敗しました')
    }
  }

  return (
    <>
      {/* カテゴリー追加フォーム */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="新しいカテゴリー名"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '作成中...' : '作成'}
          </Button>
        </div>
      </form>

      {/* カテゴリー一覧 */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <span className="font-medium">{category.name}</span>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(category.id)}
              >
                削除
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 