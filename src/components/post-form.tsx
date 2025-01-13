'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { toast } from 'sonner'

interface Category {
  id: string
  name: string
}

interface PostFormProps {
  categories: Category[]
  initialData?: {
    id?: string
    title: string
    content: string
    coverImageURL: string
    categories: { categoryId: string }[]
  }
}

export default function PostForm({ categories, initialData }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    coverImageURL: initialData?.coverImageURL || '',
    categoryIds: initialData?.categories?.map(c => c.categoryId) || []
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const endpoint = initialData?.id
        ? `/api/admin/posts/${initialData.id}`
        : '/api/admin/posts'
      
      const response = await fetch(endpoint, {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '記事の保存に失敗しました')
      }

      toast.success(initialData?.id ? '記事を更新しました' : '記事を作成しました')
      router.push('/admin/posts')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '予期せぬエラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="記事のタイトルを入力"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImageURL">カバー画像URL</Label>
        <Input
          id="coverImageURL"
          value={formData.coverImageURL}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setFormData({ ...formData, coverImageURL: e.target.value })
          }
          placeholder="画像のURLを入力"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>カテゴリー</Label>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={formData.categoryIds.includes(category.id)}
                onCheckedChange={(checked: boolean) => {
                  setFormData({
                    ...formData,
                    categoryIds: checked
                      ? [...formData.categoryIds, category.id]
                      : formData.categoryIds.filter(id => id !== category.id)
                  })
                }}
              />
              <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>本文</Label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          キャンセル
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : (initialData?.id ? '更新' : '作成')}
        </Button>
      </div>
    </form>
  )
} 