# Next.js ブログアプリケーション

Next.js 15とPrismaを使用したモダンなブログアプリケーションです。

## 主な機能

- 📝 リッチテキストエディタによる記事作成
- 🖼️ 画像アップロード機能
- 🏷️ カテゴリー管理
- 📱 レスポンシブデザイン
- ✨ モダンなUI/UX

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **データベース**: SQLite + Prisma
- **UI**: Tailwind CSS + shadcn/ui
- **エディタ**: Tiptap
- **フォーム**: React Hook Form + Zod
- **その他**:
  - TypeScript
  - ESLint
  - Prettier

## セットアップ

1. リポジトリのクローン:
```bash
git clone [repository-url]
cd blog-next
```

2. 依存関係のインストール:
```bash
npm install
```

3. データベースのセットアップ:
```bash
npx prisma generate
npx prisma db push
```

4. 開発サーバーの起動:
```bash
npm run dev
```

## 環境変数

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 機能詳細

### 記事管理
- リッチテキストエディタによる記事作成
- 画像アップロード機能
- カテゴリーの割り当て
- プレビュー機能

### カテゴリー管理
- カテゴリーの作成
- カテゴリーの編集・削除
- 記事へのカテゴリー割り当て

### UI/UX
- レスポンシブデザイン
- ダークモード対応
- トースト通知
- ローディング状態の表示

## 注意事項

リポジトリをクローンした直後は、サンプル記事のサムネイル画像が表示されません。これは、アップロードした画像ファイルが`public/uploads`ディレクトリで管理されており、セキュリティとリポジトリサイズの観点からGitにプッシュされていないためです。実際の使用時には、記事作成時に画像をアップロードすることで正常に表示されるようになります。
