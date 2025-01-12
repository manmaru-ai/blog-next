import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type PageProps = {
  params: {
    id: string
  }
}

async function getPost(id: string) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Failed to fetch post')
  }
  return res.json()
}

export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost">← 記事一覧に戻る</Button>
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-md p-8">
          {post.coverImageURL && (
            <img
              src={post.coverImageURL}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</span>
              <span className="mx-2">|</span>
              <span>{post.categories.map((pc: any) => pc.category.name).join(', ')}</span>
            </div>
          </header>

          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
} 