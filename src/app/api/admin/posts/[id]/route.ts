import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, categoryId, published } = await request.json()
    const id = parseInt(params.id)

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { error: 'Title, content and categoryId are required' },
        { status: 400 }
      )
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        categoryId: parseInt(categoryId),
        published: published ?? false
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    await prisma.post.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 