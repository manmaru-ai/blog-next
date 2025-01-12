'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const postSchema = z.object({
  title: z.string().min(1, '必須項目です'),
  content: z.string().min(1, '必須項目です'),
  coverImageURL: z.string().min(1, '必須項目です'),
  categoryIds: z.array(z.string()).min(1, '少なくとも1つのカテゴリーを選択してください')
})

type PostFormData = z.infer<typeof postSchema>

interface PostFormProps {
  post?: {
    id: string
    title: string
    content: string
    coverImageURL: string
    categories: {
      category: {
        id: string
        name: string
      }
    }[]
  }
  categories: {
    id: string
    name: string
  }[]
}

export default function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post
      ? {
          title: post.title,
          content: post.content,
          coverImageURL: post.coverImageURL,
          categoryIds: post.categories.map(c => c.category.id)
        }
      : {
          categoryIds: []
        }
  })

  const onSubmit = async (data: PostFormData) => {
    try {
      const url = post
        ? `/api/admin/posts/${post.id}`
        : '/api/admin/posts'
      const method = post ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to save post')
      }

      router.push('/admin/posts')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'エラーが発生しました')
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm('本当に削除しますか？')) return

    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete post')

      router.push('/admin/posts')
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
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          タイトル
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          本文
        </label>
        <textarea
          id="content"
          rows={10}
          {...register('content')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="coverImageURL"
          className="block text-sm font-medium text-gray-700"
        >
          カバー画像URL
        </label>
        <input
          type="url"
          id="coverImageURL"
          {...register('coverImageURL')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.coverImageURL && (
          <p className="mt-1 text-sm text-red-600">{errors.coverImageURL.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          カテゴリー（複数選択可）
        </label>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                value={category.id}
                {...register('categoryIds')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
        {errors.categoryIds && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryIds.message}</p>
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
        {post && (
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