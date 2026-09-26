import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { contributionSchema } from '@/schemas/contribution.schema'
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
  const data = getServerSession();
  console.log(data);
         
  try {
    const searchParams = request.nextUrl.searchParams
    const memberId = searchParams.get('memberId') || ''
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const groupBy = searchParams.get('groupBy') || 'day' // day, week, month

    let where: any = {}
    if (memberId) {
      where.memberId = memberId
    }

    // if (type) {
    //   where.type = type
    // }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    // Get contributions with member info
    const contributions = await prisma.contribution.findMany({
      where,
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
      },
      orderBy: { createdAt: 'desc' },
    })

    // Group contributions
    let groupedData: any = {}

    if (groupBy === 'day') {
      groupedData = contributions.reduce((acc: any, curr) => {
        const key = new Date(curr.createdAt).toISOString().split('T')[0]
        if (!acc[key]) {
          acc[key] = { date: key, total: 0, count: 0, contributions: [] }
        }
        acc[key].total += Number(curr.amount)
        acc[key].count += 1
        acc[key].contributions.push(curr)
        return acc
      }, {})
    } else if (groupBy === 'week') {
      groupedData = contributions.reduce((acc: any, curr) => {
        const date = new Date(curr.createdAt)
        const weekNumber = getWeekNumber(date)
        const year = date.getFullYear()
        const key = `${year}-W${String(weekNumber).padStart(2, '0')}`
        if (!acc[key]) {
          acc[key] = { week: key, year, weekNumber, total: 0, count: 0, contributions: [] }
        }
        acc[key].total += Number(curr.amount)
        acc[key].count += 1
        acc[key].contributions.push(curr)
        return acc
      }, {})
    } else if (groupBy === 'month') {
      groupedData = contributions.reduce((acc: any, curr) => {
        const date = new Date(curr.createdAt)
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (!acc[key]) {
          acc[key] = { month: key, year: date.getFullYear(), monthNumber: date.getMonth() + 1, total: 0, count: 0, contributions: [] }
        }
        acc[key].total += Number(curr.amount)
        acc[key].count += 1
        acc[key].contributions.push(curr)
        return acc
      }, {})
    }

    // Calculate totals
    const totalAmount = contributions.reduce((sum: number, c) => sum + Number(c.amount), 0)
    const totalCount = contributions.length

    return NextResponse.json({
      success: true,
      data: {
        contributions,
        groupedData: Object.values(groupedData),
        summary: {
          totalAmount,
          totalCount,
          averageAmount: totalCount > 0 ? totalAmount / totalCount : 0,
        },
        filters: {
          memberId,
          startDate,
          endDate,
          groupBy,
        }
      }
    })
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du chargement des contributions' },
      { status: 500 }
    )
  }
}

function getWeekNumber(date: Date): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contributionSchema.parse(body)

    // Check if member exists
    const member = await prisma.member.findUnique({
      where: { id: validatedData.memberId },
      select: {
        id: true,
        memberId: true,
        firstName: true,
        lastName: true,
        postName: true,
      }
    })

    if (!member) {
      return NextResponse.json({
        success: false,
        message: 'Cet ID de membre n\'existe pas',
        memberExists: false,
      }, { status: 404 })
    }

    // Create contribution
    const transactionReference = body.transactionReference ?? `CONTRIB-${Date.now()}`

    const contribution = await prisma.contribution.create({
      data: {
        memberId: validatedData.memberId,
        userId: body.userId,
        amount: validatedData.amount,
        transactionReference,
      },
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

    return NextResponse.json({
      success: true,
      data: contribution,
      member,
      message: `Paiement de ${validatedData.amount} $ pour ${member.firstName} ${member.lastName} enregistré avec succès`,
    })
  } catch (error: any) {
    console.error('Error creating contribution:', error)

    if (error.errors) {
      return NextResponse.json({
        success: false,
        message: 'Erreur de validation',
        errors: error.errors,
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: error.message || 'Erreur lors de la création de la contribution',
    }, { status: 500 })
  }
}