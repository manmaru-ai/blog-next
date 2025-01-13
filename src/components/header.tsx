import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tech Blog
            </h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/admin/posts">
                <Button variant="outline" size="sm">記事管理</Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="outline" size="sm">カテゴリー管理</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
} 