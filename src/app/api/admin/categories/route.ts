import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name }
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 