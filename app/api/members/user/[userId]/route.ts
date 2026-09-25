import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {

  const { userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "userId manquant" }, { status: 400 });
  }

  try {
    const member = await prisma.member.findFirst({
      where: { ownerId: userId }
    })

    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Membre non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: member,
    })
  } catch (error) {
    console.error('Error fetching member:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du chargement du membre' },
      { status: 500 }
    )
  }
}
