

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useSession } from 'next-auth/react'

// Routes publiques (accessibles sans authentification)
const publicRoutes = ['/login']

// Routes admin seulement
const adminRoutes = ['/users', '/users/new', '/users/:id/edit', '/agents', '/agents/new']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Vérifier si la route est publique
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Récupérer la session
  const session = useSession()

  // Si pas de session, rediriger vers login
  if (!session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Vérifier les routes admin
  if (adminRoutes.some(route => pathname.startsWith(route.replace(':id', '')))) {
    if (session.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Agent ne peut pas accéder aux agents
  if (session.role === 'AGENT' && pathname.startsWith('/agents')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}