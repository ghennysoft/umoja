import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
// import { getSession } from '@/lib/auth'
import { hash } from 'bcryptjs'
// import { createAuditLog } from '@/app/lib/audit'

export async function GET() {
  try {
    // const session = getSession()
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: 'Non authentifié' },
    //     { status: 401 }
    //   )
    // }

    // const user = await prisma.user.findUnique({
    //   where: { id: session.id },
    //   select: {
    //     id: true,
    //     email: true,
    //     name: true,
    //     role: true,
    //     photo: true,
    //     phone: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     // lastLogin: true,
    //     _count: {
    //       select: {
    //         members: true,
    //         contributions: true,
    //         agents: true,
    //       },
    //     },
    //   },
    // })

    return NextResponse.json({
      success: true,
      data: "user",
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du chargement du profil' },
      { status: 500 }
    )
  }
}

// export async function PUT(request: NextRequest) {
//   try {
//     const session = getSession()
//     if (!session) {
//       return NextResponse.json(
//         { success: false, message: 'Non authentifié' },
//         { status: 401 }
//       )
//     }

//     const body = await request.json()
//     const { name, email, phone, avatar } = body

//     // Vérifier si l'email est déjà utilisé
//     if (email !== session.email) {
//       const existingUser = await prisma.user.findUnique({
//         where: { email },
//       })
//       if (existingUser) {
//         return NextResponse.json(
//           { success: false, message: 'Cet email est déjà utilisé' },
//           { status: 400 }
//         )
//       }
//     }

//     const user = await prisma.user.update({
//       where: { id: session.id },
//       data: {
//         name,
//         email,
//         phone,
//         avatar,
//       },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         role: true,
//         avatar: true,
//         phone: true,
//       },
//     })

//     // Audit log
//     await createAuditLog({
//       userId: session.id,
//       action: 'UPDATE',
//       entity: 'USER',
//       entityId: session.id,
//       changes: { name, email, phone },
//     })

//     return NextResponse.json({
//       success: true,
//       data: user,
//       message: 'Profil mis à jour avec succès',
//     })
//   } catch (error) {
//     console.error('Error updating profile:', error)
//     return NextResponse.json(
//       { success: false, message: 'Erreur lors de la mise à jour du profil' },
//       { status: 500 }
//     )
//   }
// }