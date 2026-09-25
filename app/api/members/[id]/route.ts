import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const member = await prisma.member.findUnique({
      where: { id: id },
      // include: {
      //   contributions: {
      //     orderBy: { date: 'desc' },
      //     take: 5,
      //   },
      // },
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

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const formData = await request.formData()
//     const data: Record<string, any> = {}
//     const files: Record<string, File> = {}

//     for (const [key, value] of formData.entries()) {
//       if (value instanceof File) {
//         files[key] = value
//       } else {
//         data[key] = value
//       }
//     }

//     if (data.hasDiploma) {
//       data.hasDiploma = data.hasDiploma === 'true'
//     }

//     const validatedData = memberSchema.partial().parse(data)

//     const existingMember = await prisma.member.findUnique({
//       where: { id: params.id },
//     })

//     if (!existingMember) {
//       return NextResponse.json(
//         { success: false, message: 'Membre non trouvé' },
//         { status: 404 }
//       )
//     }

//     const uploadDir = path.join(process.cwd(), 'public/uploads/members')
//     await mkdir(uploadDir, { recursive: true })

//     let photoPath = existingMember.photo

//     if (files.photo) {
//       if (existingMember.photo) {
//         const oldPath = path.join(process.cwd(), 'public', existingMember.photo)
//         try {
//           await unlink(oldPath)
//         } catch (e) {}
//       }

//       const photoBuffer = Buffer.from(await files.photo.arrayBuffer())
//       const fileName = `photo-${Date.now()}-${files.photo.name}`
//       const filePath = path.join(uploadDir, fileName)
//       await writeFile(filePath, photoBuffer)
//       photoPath = `/uploads/members/${fileName}`
//     }

//     const member = await prisma.member.update({
//       where: { id: params.id },
//       data: {
//         ...validatedData,
//         photo: photoPath,
//         birthDate: validatedData.birthDate ? new Date(validatedData.birthDate) : undefined,
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: member,
//       message: 'Membre mis à jour avec succès',
//     })
//   } catch (error: any) {
//     console.error('Error updating member:', error)
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
//     const member = await prisma.member.findUnique({
//       where: { id: params.id },
//     })

//     if (!member) {
//       return NextResponse.json(
//         { success: false, message: 'Membre non trouvé' },
//         { status: 404 }
//       )
//     }

//     if (member.photo) {
//       const photoPath = path.join(process.cwd(), 'public', member.photo)
//       try {
//         await unlink(photoPath)
//       } catch (e) {}
//     }

//     await prisma.member.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Membre supprimé avec succès',
//     })
//   } catch (error) {
//     console.error('Error deleting member:', error)
//     return NextResponse.json(
//       { success: false, message: 'Erreur lors de la suppression' },
//       { status: 500 }
//     )
//   }
// }