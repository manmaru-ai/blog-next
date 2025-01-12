import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    
    const posts = await prisma.post.findMany({
      where: categoryId ? {
        categories: {
          some: {
            categoryId: categoryId
          }
        }
      } : {},
      include: {
        categories: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Posts fetch error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 