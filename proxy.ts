// proxy.ts
import { NextRequest, NextResponse } from "next/server";

// 1. Définition des routes publiques et du gestionnaire de cookies
const publicRoutes = ["/", "/login", "/reset-password", "/confirm-reset"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifie si la route actuelle correspond à l'une des routes publiques (exacte ou sous-route)
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 2. Récupération dynamique du cookie de session par défaut de Next-Auth
  // Gère automatiquement le préfixe __Secure- appliqué par Next-Auth en HTTPS (production)
  const sessionCookie = 
    request.cookies.get("__Secure-next-auth.session-token")?.value || 
    request.cookies.get("next-auth.session-token")?.value;

  const isUserAuthenticated = !!sessionCookie;

  // 3. Utilisateur connecté → Empêcher l'accès aux pages de connexion/reset et rediriger vers l'accueil
  if (isPublicRoute && isUserAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. Utilisateur non connecté → Protéger toutes les autres routes (privées)
  if (!isPublicRoute && !isUserAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Conserve l'URL d'origine pour y renvoyer l'utilisateur après sa connexion
    loginUrl.searchParams.set("callbackUrl", pathname); 

    return NextResponse.redirect(loginUrl);
  }

  // Laisse passer la requête si aucune condition de redirection n'est remplie
  return NextResponse.next();
}

// 5. Configuration du Matcher pour exclure les assets et les appels API internes
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (les routes d'API, y compris les endpoints d'authentification /api/auth)
     * - _next/static (les fichiers statiques de Next.js)
     * - _next/image (le service d'optimisation d'images)
     * - favicon.ico, sitemap.xml, robots.txt (fichiers de structure ou SEO communs)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
