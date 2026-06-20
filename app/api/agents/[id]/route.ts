import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { agentSchema } from '@/schemas/agent.schema'
import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const agent = await prisma.agent.findUnique({
      where: { id: id },
    })

    if (!agent) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: agent,
    })
  } catch (error) {
    console.error('Error fetching agent:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch agent' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }
  
  try {
    const formData = await request.formData()
    const data: Record<string, any> = {}
    const files: Record<string, File> = {}

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value
      } else {
        data[key] = value
      }
    }

    if (data.hasId) {
      data.hasId = data.hasId === 'true'
    }

    const validatedData = agentSchema.partial().parse(data)

    const existingAgent = await prisma.agent.findUnique({
      where: { id: params.id },
    })

    if (!existingAgent) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      )
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads/agents')
    await mkdir(uploadDir, { recursive: true })

    let photoPath = existingAgent.photo
    let idPhotoPath = existingAgent.idPhoto

    if (files.photo) {
      // Delete old photo if exists
      if (existingAgent.photo) {
        const oldPath = path.join(process.cwd(), 'public', existingAgent.photo)
        try {
          await unlink(oldPath)
        } catch (e) {}
      }

      const photoBuffer = Buffer.from(await files.photo.arrayBuffer())
      const fileName = `photo-${Date.now()}-${files.photo.name}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, photoBuffer)
      photoPath = `/uploads/agents/${fileName}`
    }

    if (files.idPhoto) {
      if (existingAgent.idPhoto) {
        const oldPath = path.join(process.cwd(), 'public', existingAgent.idPhoto)
        try {
          await unlink(oldPath)
        } catch (e) {}
      }

      const idPhotoBuffer = Buffer.from(await files.idPhoto.arrayBuffer())
      const fileName = `id-${Date.now()}-${files.idPhoto.name}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, idPhotoBuffer)
      idPhotoPath = `/uploads/agents/${fileName}`
    }

    const agent = await prisma.agent.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        photo: photoPath,
        idPhoto: idPhotoPath,
        birthDate: validatedData.birthDate ? new Date(validatedData.birthDate) : undefined,
        idExpirationDate: validatedData.idExpirationDate ? new Date(validatedData.idExpirationDate) : undefined,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      data: agent,
      message: 'Agent updated successfully',
    })
  } catch (error: any) {
    console.error('Error updating agent:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update agent' },
      { status: 500 }
    )
  }
}

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const agent = await prisma.agent.findUnique({
//       where: { id: params.id },
//     })

//     if (!agent) {
//       return NextResponse.json(
//         { success: false, message: 'Agent not found' },
//         { status: 404 }
//       )
//     }

//     // Delete associated files
//     if (agent.photo) {
//       const photoPath = path.join(process.cwd(), 'public', agent.photo)
//       try {
//         await unlink(photoPath)
//       } catch (e) {}
//     }

//     if (agent.idPhoto) {
//       const idPhotoPath = path.join(process.cwd(), 'public', agent.idPhoto)
//       try {
//         await unlink(idPhotoPath)
//       } catch (e) {}
//     }

//     await prisma.agent.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Agent deleted successfully',
//     })
//   } catch (error) {
//     console.error('Error deleting agent:', error)
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete agent' },
//       { status: 500 }
//     )
//   }
// }