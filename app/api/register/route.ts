import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import {NextRequest, NextResponse} from 'next/server'


export async function POST(
    request: NextRequest
) {
    try { 

        const body = await request.json()
        const { 
        email, 
        name, 
        password 
    } = body
    
    if(!name || !email || !password) { 
        return new NextResponse('Missing Info', {status: 400})
    }
    
    const hashedPassword = await bcrypt.hash(password, 2)
    const user = await prisma.user.create({ 
        data: { 
            email, 
            name, 
            hashedPassword 
        }
    })
    
    return NextResponse.json(user )
    } catch(err) { 
        console.log(err, 'REGISTARTATION ERROR::::::')
        return new NextResponse('INTERNAL ERROR', {status: 500})
    }
}