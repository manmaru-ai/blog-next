'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`, {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<{ id: string, name: string } | null>(null)
  const [newName, setNewName] = useState('')

  async function fetchCategories() {
    try {
      setIsLoading(true)
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カテゴリーの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateCategory(id: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(
          `Failed to update category: ${res.status} ${res.statusText}${
            errorData.error ? ` - ${errorData.error}` : ''
          }`
        )
      }

      toast.success('カテゴリーを更新しました')
      setEditingCategory(null)
      setNewName('')
      await fetchCategories()
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error(error instanceof Error ? error.message : 'カテゴリーの更新に失敗しました')
    }
  }

  async function handleDeleteCategory(id: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/categories/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(
          `Failed to delete category: ${res.status} ${res.statusText}${
            errorData.error ? ` - ${errorData.error}` : ''
          }`
        )
      }

      toast.success('カテゴリーを削除しました')
      await fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error(error instanceof Error ? error.message : 'カテゴリーの削除に失敗しました')
    }
  }

  // 初回レンダリング時にデータを取得
  useState(() => {
    fetchCategories()
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
        <h1 className="text-2xl font-bold">カテゴリー管理</h1>
        <Link href="/admin/categories/new">
          <Button>新規作成</Button>
        </Link>
      </div>
      
      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              {editingCategory?.id === category.id ? (
                <div className="flex-grow mr-4">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="新しいカテゴリー名"
                  />
                </div>
              ) : (
                <h2 className="text-xl font-semibold">{category.name}</h2>
              )}
              
              <div className="flex gap-2">
                {editingCategory?.id === category.id ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleUpdateCategory(category.id)}
                    >
                      保存
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCategory(null)
                        setNewName('')
                      }}
                    >
                      キャンセル
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCategory(category)
                        setNewName(category.name)
                      }}
                    >
                      編集
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      削除
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 