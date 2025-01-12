import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost">← トップページに戻る</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">このサイトについて</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">サイトの目的</h2>
            <p className="text-gray-700 mb-4">
              このブログサイトは、Next.js、Prisma、TypeScriptを使用して構築された
              モダンなウェブアプリケーションです。
            </p>
            <p className="text-gray-700 mb-4">
              記事の管理、カテゴリ分類、画像表示などの基本的なブログ機能を
              実装しています。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">使用技術</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Next.js 14 (App Router)</li>
              <li>TypeScript</li>
              <li>Prisma (ORM)</li>
              <li>SQLite</li>
              <li>Tailwind CSS</li>
              <li>shadcn/ui</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">制作者プロフィール</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">開発者</h3>
              <p className="text-gray-700 mb-4">
                Web開発に情熱を持つエンジニアです。
                モダンな技術スタックを使用して、
                使いやすく保守性の高いアプリケーションの開発を心がけています。
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Twitter
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 