import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { contributionSchema } from '@/schemas/contribution.schema'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const contribution = await prisma.contribution.findUnique({
      where: { id: id },
      include: {
        member: {
          select: {
            id: true,
            memberId: true,
            firstName: true,
            lastName: true,
            postName: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    if (!contribution) {
      return NextResponse.json(
        { success: false, message: 'Contribution non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contribution,
    })
  } catch (error) {
    console.error('Error fetching contribution:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du chargement de la contribution' },
      { status: 500 }
    )
  }
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json()
//     const validatedData = contributionSchema.partial().parse(body)

//     const contribution = await prisma.contribution.update({
//       where: { id: params.id },
//       data: validatedData,
//       include: {
//         member: {
//           select: {
//             id: true,
//             memberId: true,
//             firstName: true,
//             lastName: true,
//             postName: true,
//           }
//         }
//       }
//     })

//     return NextResponse.json({
//       success: true,
//       data: contribution,
//       message: 'Contribution mise à jour avec succès',
//     })
//   } catch (error: any) {
//     console.error('Error updating contribution:', error)
//     return NextResponse.json(
//       { success: false, message: error.message || 'Erreur lors de la mise à jour' },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await prisma.contribution.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Contribution supprimée avec succès',
//     })
//   } catch (error) {
//     console.error('Error deleting contribution:', error)
//     return NextResponse.json(
//       { success: false, message: 'Erreur lors de la suppression' },
//       { status: 500 }
//     )
//   }
// }