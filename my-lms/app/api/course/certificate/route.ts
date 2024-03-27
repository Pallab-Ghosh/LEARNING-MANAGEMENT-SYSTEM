import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"



export async function POST(req:Request,params:{params:string})
{
  try {
    const{userId}=auth();
    const{courseId}=await req.json();
  

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
      //console.log("has certi",has_Certificate)
        return NextResponse.json(has_Certificate)
    }
    else
    {
            const  newCertificate=await db.userCertificate.create({
              data:{
                      userId, 
                      courseId :courseId 
                   }
             });
           return NextResponse.json(newCertificate)
    }
  
  
    
  


  } 
  catch (error) {
    console.log('[Certificate]',error)
    return new NextResponse('Internal Error',{status:500})
  }
}






