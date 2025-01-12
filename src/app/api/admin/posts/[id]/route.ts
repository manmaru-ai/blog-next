import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { title, content, coverImageURL, categoryIds } = await request.json()

    if (!title || !content || !coverImageURL || !categoryIds || !categoryIds.length) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      )
    }

    const post = await prisma.post.update({
      where: { id: context.params.id },
      data: {
        title,
        content,
        coverImageURL,
        categories: {
          deleteMany: {},
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
    console.error('Post update error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: { id: context.params.id }
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Post deletion error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 