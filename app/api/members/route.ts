import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { generateMemberId } from '@/app/lib/utils'
import { memberSchema } from '@/schemas/member.schema'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

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

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          contributions: {
            take: 1,
          },
        },
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
      { success: false, message: 'Erreur lors du chargement des membres' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const data: Record<string, any> = {}
    const files: Record<string, File> = {}

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value
      } else {
        data[key] = value
      }
    }

    // Parse boolean fields
    if (data.hasDiploma) {
      data.hasDiploma = data.hasDiploma === 'true'
    }

    // Validate data
    const validatedData = memberSchema.parse(data)

    // Handle file uploads
    const uploadDir = path.join(process.cwd(), 'public/uploads/members')
    await mkdir(uploadDir, { recursive: true })

    let photoPath: string | undefined

    if (files.photo) {
      const photoBuffer = Buffer.from(await files.photo.arrayBuffer())
      const fileName = `photo-${Date.now()}-${files.photo.name}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, photoBuffer)
      photoPath = `/uploads/members/${fileName}`
    }

    // Generate member ID
    const memberId = generateMemberId()

    // Create member in database
    const member = await prisma.member.create({
      data: {
        memberId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        postName: validatedData.postName,
        photo: photoPath,
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
        whatsapp: validatedData.whatsapp,
        email: validatedData.email,
        hasDiploma: validatedData.hasDiploma,
        diplomaLevel: validatedData.diplomaLevel,
        profession: validatedData.profession,
      },
    })

    return NextResponse.json({
      success: true,
      data: member,
      message: 'Membre créé avec succès',
    })
  } catch (error: any) {
    console.error('Error creating member:', error)
    
    if (error.errors) {
      return NextResponse.json(
        {
          success: false,
          message: 'Erreur de validation',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: error.message || 'Erreur lors de la création du membre' },
      { status: 500 }
    )
  }
}