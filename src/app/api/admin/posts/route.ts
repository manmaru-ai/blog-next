import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
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
    console.error('Failed to fetch posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received post data:', data)

    const { title, content, coverImageURL, categoryIds } = data

    const missingFields = []
    if (!title) missingFields.push('title')
    if (!content) missingFields.push('content')
    if (!coverImageURL) missingFields.push('coverImageURL')
    if (!categoryIds || !categoryIds.length) missingFields.push('categoryIds')

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Required fields are missing',
          missingFields: missingFields,
          receivedData: data
        },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
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
    console.error('Post creation error:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 