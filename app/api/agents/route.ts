import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { generateAgentId } from '@/app/lib/utils'
import { agentSchema } from '@/schemas/agent.schema'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const zone = searchParams.get('zone') || ''

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { agentId: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (zone) {
      where.zone = zone
    }

    const [agents, total] = await Promise.all([
      prisma.agent.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.agent.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: agents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extraire les données du formulaire
    const data: Record<string, any> = {}
    const files: Record<string, File> = {}

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value
        // Pour les fichiers, on stocke le nom du fichier dans data
        data[key] = value.name
      } else {
        // Convertir les valeurs booléennes
        if (key === 'hasId') {
          data[key] = value === 'true'
        } else {
          data[key] = value
        }
      }
    }

    console.log('Received data:', data)
    console.log('Received files:', Object.keys(files))

    // Valider les données
    const validatedData = agentSchema.parse(data)
    console.log('Validated data:', validatedData)

    // Gérer l'upload des fichiers
    const uploadDir = path.join(process.cwd(), 'public/uploads/agents')
    await mkdir(uploadDir, { recursive: true })

    let photoPath: string | undefined
    let idPhotoPath: string | undefined

    if (files.photo) {
      const photoBuffer = Buffer.from(await files.photo.arrayBuffer())
      const fileExtension = files.photo.name.split('.').pop()
      const fileName = `photo-${Date.now()}.${fileExtension}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, photoBuffer)
      photoPath = `/uploads/agents/${fileName}`
    }

    if (files.idPhoto) {
      const idPhotoBuffer = Buffer.from(await files.idPhoto.arrayBuffer())
      const fileExtension = files.idPhoto.name.split('.').pop()
      const fileName = `id-${Date.now()}.${fileExtension}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, idPhotoBuffer)
      idPhotoPath = `/uploads/agents/${fileName}`
    }

    // Générer l'ID de l'agent
    const agentId = generateAgentId()

    // Créer l'agent dans la base de données
    const agent = await prisma.agent.create({
      data: {
        agentId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        postName: validatedData.postName || null,
        photo: photoPath || null,
        birthDate: new Date(validatedData.birthDate),
        birthPlace: validatedData.birthPlace,
        gender: validatedData.gender,
        nationality: validatedData.nationality,
        provinceOrigin: validatedData.provinceOrigin,
        maritalStatus: validatedData.maritalStatus,
        country: validatedData.country,
        city: validatedData.city,
        commune: validatedData.commune,
        address: validatedData.address,
        phone: validatedData.phone,
        whatsapp: validatedData.whatsapp || null,
        email: validatedData.email || null,
        hasId: validatedData.hasId,
        idType: validatedData.idType || null,
        idNumber: validatedData.idNumber || null,
        idExpirationDate: validatedData.idExpirationDate ? new Date(validatedData.idExpirationDate) : null,
        idPhoto: idPhotoPath || null,
        function: validatedData.function,
        zone: validatedData.zone,
        startDate: new Date(validatedData.startDate),
        supervisor: validatedData.supervisor || null,
      },
    })

    console.log('Agent created:', agent)

    return NextResponse.json({
      success: true,
      data: agent,
      message: 'Agent created successfully',
    })
  } catch (error: any) {
    console.error('Error creating agent:', error)
    
    // Gérer les erreurs de validation Zod
    if (error.name === 'ZodError') {
      const errors = error.errors.reduce((acc: any, err: any) => {
        const path = err.path.join('.')
        acc[path] = [err.message]
        return acc
      }, {})
      
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create agent' },
      { status: 500 }
    )
  }
}