import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { renderToBuffer } from '@react-pdf/renderer';
import { FacturePOS } from '@/components/facture-pos';
import React from 'react';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const sale = await prisma.sale.findUnique({
      where: { id: id },
      include: {
        items: { 
          include: { 
            product: true 
          } 
        },
        client: true,
        user: true,
      },
    });
    
    if (!sale) {
      return new NextResponse('Non trouvé', { status: 404 });
    }

    // Créer l'élément React pour la facture POS
    const pdfElement = React.createElement(FacturePOS, { sale });
    const pdfBuffer = await renderToBuffer(pdfElement);
    
    // Retourner le PDF pour impression POS
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=facture_${sale.invoiceNumber}.pdf`,
        // Pour certaines imprimantes POS, utiliser "attachment" force le téléchargement
        // 'Content-Disposition': `attachment; filename=facture_${sale.invoiceNumber}.pdf`,
      },
    });
  } catch (error) {
    console.error('Erreur génération PDF:', error);
    return new NextResponse('Erreur interne', { status: 500 });
  }
}