import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest){ 
    try { 
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const {
            userId, 
            isGroup, 
            members, 
            name
        } = body
        if (!currentUser?.id || !currentUser?.email) { 
            return new NextResponse('Unauthorize', {status: 500})
        }

        if(isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', {status: 400})
        } 

        if(isGroup) { 
            const newConversation = await prisma.conversation.create({ 
                data: { 
                    name, 
                    isGroup, 
                    users: { 
                        connect: [
                            ...members.map((member: {value: string}) => ({ 
                                id: member.value
                            })), 
                            { 
                                id: currentUser.id
                            }
                        ]
                    }
                }, 
                include: { 
                    users: true
                }
            })

            return NextResponse.json(newConversation)

            const existingConversation = await prisma.conversation.findMany({
                where: { 
                   OR: [
                    
                   ]
                }
            })
        }

    }catch(error) { 
        return new NextResponse('Internal Error', {status: 500})
    }
}




