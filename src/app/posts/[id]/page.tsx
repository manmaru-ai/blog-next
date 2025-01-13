import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

type PageProps = {
  params: { id: string }
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
}: PageProps) {
  const resolvedParams = await params
  const { id } = resolvedParams
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <main className="container max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="group transition-all">
              <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              記事一覧に戻る
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden border-none shadow-lg">
          {post.coverImageURL && (
            <div className="relative w-full h-[400px] overflow-hidden">
              <img
                src={post.coverImageURL}
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          )}
          
          <CardHeader className="space-y-6 pt-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((pc: any, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {pc.category.name}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Separator className="my-8" />
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {post.content.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 