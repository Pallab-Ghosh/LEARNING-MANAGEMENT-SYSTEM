import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"



export async function POST(req:Request,params:{params:string})
{
  try {
    const{userId}=auth();
    const{courseId , credential_Id}=await req.json();
    console.log('credential_Id in server from client',credential_Id)

    if(!userId)
    {
        return new NextResponse('Unauthorized',{status:401})
    }

   const has_Certificate = await db.userCertificate.findFirst({
        where : {
               userId:userId,
               courseId:courseId
        }
   })

    if(has_Certificate?.credentialId)
    {
        return NextResponse.json(has_Certificate.credentialId)
    }
  
    const  newCertificate=await db.userCertificate.create({
        data:{
                userId, 
                credentialId :credential_Id,
                courseId :courseId 
        }
    });
    
    return NextResponse.json(newCertificate)


  } 
  catch (error) {
    console.log('[Certificate]',error)
    return new NextResponse('Internal Error',{status:500})
  }
}






