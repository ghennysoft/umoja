import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { generateAgentId } from '@/app/lib/utils'
import { memberSchema } from '@/schemas/member.schema'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    // const zone = searchParams.get('zone') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { memberId: { contains: search, mode: 'insensitive' } },
      ]
    }

    // if (zone) {
    //   where.zone = zone
    // }

    if (status) {
      where.status = status
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.member.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch members' },
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
    const validatedData = memberSchema.parse(data)
    console.log('Validated data:', validatedData)

    // Gérer l'upload des fichiers
    const uploadDir = path.join(process.cwd(), 'public/uploads/members')
    await mkdir(uploadDir, { recursive: true })

    let photoPath: string | undefined
    let idPhotoPath: string | undefined

    if (files.photo) {
      const photoBuffer = Buffer.from(await files.photo.arrayBuffer())
      const fileExtension = files.photo.name.split('.').pop()
      const fileName = `photo-${Date.now()}.${fileExtension}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, photoBuffer)
      photoPath = `/uploads/members/${fileName}`
    }

    if (files.idPhoto) {
      const idPhotoBuffer = Buffer.from(await files.idPhoto.arrayBuffer())
      const fileExtension = files.idPhoto.name.split('.').pop()
      const fileName = `id-${Date.now()}.${fileExtension}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, idPhotoBuffer)
      idPhotoPath = `/uploads/members/${fileName}`
    }

    // Générer l'ID de l'member
    const memberId = generatememberId()

    // Créer l'member dans la base de données
    const member = await prisma.member.create({
      data: {
        memberId,
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
        
        hasDiplome: validatedData.hasDiplome,
        diplomeLevel: validatedData.diplomeLevel || null,
        Profession: validatedData.Profession || null,
      },
    })

    console.log('member created:', member)

    return NextResponse.json({
      success: true,
      data: member,
      message: 'member created successfully',
    })
  } catch (error: any) {
    console.error('Error creating member:', error)
    
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
      { success: false, message: error.message || 'Failed to create member' },
      { status: 500 }
    )
  }
}