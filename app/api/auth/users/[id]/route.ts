import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
// import { requireAdmin, getSession } from '@/lib/auth'
import { hash } from 'bcryptjs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    // const session = getSession()
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: 'Non authentifié' },
    //     { status: 401 }
    //   )
    // }

    // Un utilisateur ne peut voir que son propre profil
    // if (session.role !== 'ADMIN' && session.id !== params.id) {
    //   return NextResponse.json(
    //     { success: false, message: 'Accès non autorisé' },
    //     { status: 403 }
    //   )
    // }

    const user = await prisma.user.findUnique({
      where: { id: id },
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
            members: true,
            contributions: true,
            agents: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du chargement' },
      { status: 500 }
    )
  }
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     requireAdmin()

//     const body = await request.json()
//     const { email, name, role, password } = body

//     const data: any = { email, name, role }

//     if (password) {
//       data.password = await hash(password, 10)
//     }

//     const user = await prisma.user.update({
//       where: { id: params.id },
//       data,
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         role: true,
//         createdAt: true,
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: user,
//       message: 'Utilisateur mis à jour avec succès',
//     })
//   } catch (error: any) {
//     console.error('Error updating user:', error)
//     return NextResponse.json(
//       { success: false, message: error.message || 'Erreur lors de la mise à jour' },
//       { status: error.message === 'Unauthorized' ? 401 : 500 }
//     )
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     requireAdmin()

//     await prisma.user.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Utilisateur supprimé avec succès',
//     })
//   } catch (error: any) {
//     console.error('Error deleting user:', error)
//     return NextResponse.json(
//       { success: false, message: error.message || 'Erreur lors de la suppression' },
//       { status: error.message === 'Unauthorized' ? 401 : 500 }
//     )
//   }
// }