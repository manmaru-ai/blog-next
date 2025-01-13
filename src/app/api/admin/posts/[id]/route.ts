import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id
      },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { title, content, coverImageURL, categoryIds } = data

    // 入力検証
    const missingFields = []
    if (!title) missingFields.push('title')
    if (!content) missingFields.push('content')
    if (!coverImageURL) missingFields.push('coverImageURL')
    if (!categoryIds || !categoryIds.length) missingFields.push('categoryIds')

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Required fields are missing',
          missingFields
        },
        { status: 400 }
      )
    }

    // 既存のカテゴリー関連を削除
    await prisma.postCategory.deleteMany({
      where: {
        postId: params.id
      }
    })

    // 記事を更新
    const post = await prisma.post.update({
      where: {
        id: params.id
      },
      data: {
        title,
        content,
        coverImageURL,
        categories: {
          create: categoryIds.map((categoryId: string) => ({
            categoryId
          }))
        }
      },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 関連するカテゴリーを先に削除
    await prisma.postCategory.deleteMany({
      where: {
        postId: params.id
      }
    })

    // 記事を削除
    const post = await prisma.post.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 