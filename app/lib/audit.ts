import prisma from './prisma'

interface AuditLogData {
  userId: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT'
  entity: 'USER' | 'MEMBER' | 'AGENT' | 'CONTRIBUTION'
  entityId?: string
  changes?: any
  ipAddress?: string
  userAgent?: string
}

export async function createAuditLog(data: AuditLogData) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        changes: data.changes ? JSON.parse(JSON.stringify(data.changes)) : null,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    })
  } catch (error) {
    console.error('Error creating audit log:', error)
  }
}

export async function getAuditLogs(
  userId?: string,
  entity?: string,
  action?: string,
  limit: number = 50
) {
  const where: any = {}

  if (userId) where.userId = userId
  if (entity) where.entity = entity
  if (action) where.action = action

  return prisma.auditLog.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}