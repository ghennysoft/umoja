import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';


export async function GET(request: NextRequest) {
  try {
    // requireAdmin()

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (role) {
      where.role = role
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        photo: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            contributions: true,
            // agents: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: users,
    })
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Erreur lors du chargement des utilisateurs' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    )
  }
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // Vérifier si l'email existe déjà
    const email = body.email;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Cet email est déjà utilisé' },
        { status: 400 }
      )
    }    
    
    try {
      const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    })

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Utilisateur créé avec succès',
    })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { success: false, message: error.message || 'Erreur lors de la création' },
            { status: error.message === 'Unauthorized' ? 401 : 500 }
        )
    }
}
