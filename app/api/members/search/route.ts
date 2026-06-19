import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''

    const members = await prisma.member.findMany({
      where: {
        OR: [
          { memberId: { contains: query, mode: 'insensitive' } },
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
        ]
      },
      select: {
        id: true,
        memberId: true,
        firstName: true,
        lastName: true,
        postName: true,
        photo: true,
      },
      take: 10,
    })

    return NextResponse.json({
      success: true,
      data: members,
    })
  } catch (error) {
    console.error('Error searching members:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la recherche' },
      { status: 500 }
    )
  }
}