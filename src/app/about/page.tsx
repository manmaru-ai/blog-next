import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* プロフィールセクション */}
          <section className="text-center mb-12">
            <div className="mb-6">
              <Image
                src="/icon.png"
                alt="manmaru"
                width={120}
                height={120}
                className="rounded-full mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">manmaru</h1>
            <p className="text-gray-600 mb-4">高専生 / プログラマー</p>
            <Link href="https://github.com/manmaru-ai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <GitHubLogoIcon className="w-4 h-4" />
                GitHub
              </Button>
            </Link>
          </section>

          {/* プロフィール詳細 */}
          <section className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">PROFILE</h2>
            <p>
              私は大阪公立大学工業高等専門学校の知能情報コースに所属する高専生です。プログラミングと新しい技術の探求に情熱を持って取り組んでいます。
            </p>
            <p>
              特にAI技術に強い関心を持っており、Discord botの開発やWeb開発など、様々なプロジェクトに挑戦しています。
            </p>
            <p>
              常に新しい技術を学び、実践的なプロジェクトを通じて成長することを心がけています。現在は、AI技術とWeb開発の融合に特に注目しています。
            </p>
          </section>

          {/* このサイトについて */}
          <section className="prose prose-lg max-w-none mt-12">
            <h2 className="text-2xl font-bold mb-4">このサイトについて</h2>
            <p>
              このブログは、Next.js 15のApp Routerを使用して開発された個人ブログです。
              モダンなWeb技術を活用し、高速で使いやすいブログシステムを目指しています。
            </p>
            <p>
              主な特徴：
            </p>
            <ul>
              <li>Next.js 15 App Router採用による最新のアーキテクチャ</li>
              <li>Tailwind CSSを用いたレスポンシブデザイン</li>
              <li>Prismaによるタイプセーフなデータベース操作</li>
              <li>リッチテキストエディタによる快適な記事作成体験</li>
              <li>画像アップロード機能</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
} 