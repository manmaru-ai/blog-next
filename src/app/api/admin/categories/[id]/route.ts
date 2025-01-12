import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await request.json()
    const id = parseInt(params.id)

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id: id.toString() },
      data: { name }
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.category.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Category deletion error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 