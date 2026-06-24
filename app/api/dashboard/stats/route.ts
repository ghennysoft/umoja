import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET() {
  try {

    // Statistiques de base
    const [
      totalMembers,
      totalContributions,
      totalAgents,
      totalUsers,
      monthlyContributions,
      recentMembers,
      recentContributions,
    ] = await Promise.all([
      // Total des membres
      prisma.member.count(),
      
      // Total des contributions (montant)
      prisma.contribution.aggregate({
        _sum: { amount: true },
        _count: true,
      }),
      
      // Total des agents
      prisma.agent.count(),
      
      // Total des utilisateurs
      prisma.user.count(),
      
      // Contributions du mois
      prisma.contribution.aggregate({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { amount: true },
      }),
      
      // Derniers membres
      prisma.member.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        // include: {
        //   user: {
        //     select: { name: true },
        //   },
        // },
      }),
      
      // Dernières contributions
      prisma.contribution.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          member: {
            select: {
              firstName: true,
              lastName: true,
              memberId: true,
            },
          },
        },
      }),
    ])

    // Données pour les graphiques - Version Prisma pur
    const monthlyData = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      
      const result = await prisma.contribution.aggregate({
        where: {
          createdAt: {
            gte: month,
            lt: nextMonth,
          },
        },
        _sum: { amount: true },
        _count: true,
      })
      
      monthlyData.push({
        month: month.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
        total: result._sum.amount || 0,
        count: result._count || 0,
      })
    }

    // Répartition par type de contribution - Version Prisma pur
    const contributionTypes = await prisma.contribution.groupBy({
      by: ['amount'],
      _sum: { amount: true },
      _count: true,
    })

    // Répartition par genre des membres
    const genderDistribution = await prisma.member.groupBy({
      by: ['gender'],
      _count: true,
    })

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalMembers,
          totalContributions: totalContributions._sum.amount || 0,
          totalContributionsCount: totalContributions._count,
          totalAgents,
          totalUsers,
          monthlyContributions: monthlyContributions._sum.amount || 0,
        },
        charts: {
          monthlyData: monthlyData.map((d: any) => ({
            month: new Date(d.month).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
            total: Number(d.total),
            count: Number(d.count),
          })),
          contributionTypes: contributionTypes.map((c: any) => ({
            total: c._sum.amount || 0,
            count: c._count,
          })),
          genderDistribution: genderDistribution.map((g: any) => ({
            gender: g.gender === 'MALE' ? 'Hommes' : 'Femmes',
            count: g._count,
          })),
        },
        recent: {
          members: recentMembers,
          contributions: recentContributions,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du chargement des statistiques' },
      { status: 500 }
    )
  }
}