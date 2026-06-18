import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Umoja Yetu ASBL - Tableau de bord',
  description: 'Tableau de bord de gestion de l\'ASBL Umoja Yetu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased overflow-hidden flex h-screen">
        {children}
      </body>
    </html>
  )
}