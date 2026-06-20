import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Routes publiques (accessibles sans authentification)
    const publicRoutes = ['/login']

    // Routes admin seulement
    const adminRoutes = ['/users', '/users/new', '/users/:id/edit', '/agents', '/agents/new']

    // Si pas de session, rediriger vers login
  // if (!token) {
  //   const loginUrl = new URL('/login', req.url)
  //   loginUrl.searchParams.set('redirect', path)
  //   return NextResponse.redirect(loginUrl)
  // }

  // Vérifier les routes admin
  if (adminRoutes.some(route => path.startsWith(route.replace(':id', '')))) {
    if (token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Agent ne peut pas accéder aux agents
  if (token?.role === 'AGENT' && path.startsWith('/agents')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }


    // // Redirection admin
    // if (path.startsWith("/admin") && token?.role !== "ADMIN") {
    //   return NextResponse.redirect(new URL("/caisse", req.url));
    // }

    // // Redirection caisse pour admin
    // if (path.startsWith("/caisse") && token?.role === "ADMIN") {
    //   return NextResponse.redirect(new URL("/admin", req.url));
    // }

    // Vérifier si la route est publique
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/agents/:path*", "/cotiations/:path*", "/dashboard/:path*", "/members/:path*", "/profile/:path*", "/users/:path*"],
};

