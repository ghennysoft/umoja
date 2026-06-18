import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';


export async function GET() {
    try {
        const user = await prisma.user.findMany();
      return NextResponse.json(user, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    
    const hashedPassword = await bcrypt.hash(body.password, 10)

    console.log({
          name: body.name,
          email: body.email,
          password: hashedPassword,
          role: body.role,
        });

    // 1. Vérifier si le numéro est déjà pris
    // const existingUser = await prisma.user.findUnique({
    //     where: { email: body.email }
    // });

    // console.log({existingUser});

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "Cet email est déjà utilisé." }, 
    //     { status: 400 }
    //   );
    // }
    

    try {
        const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
          role: body.role,
        },
      });

      return NextResponse.json(user, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
