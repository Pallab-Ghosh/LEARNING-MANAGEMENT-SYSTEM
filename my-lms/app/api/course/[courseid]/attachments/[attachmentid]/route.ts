import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type params_type={
    params:{
        courseid:string,
        attachmentid:string
    },
    
}

export async function DELETE(req:Request,{params}:params_type){
  try 
  {
    const {userId}=auth();
   

    if(!userId)return new NextResponse('Unauthorized',{status:401});

    const courseOwner=await db.course.findUnique({
        where:{id:params.courseid,userId:userId}
    })



    if(!courseOwner)return new NextResponse('Unauthorized',{status:401});

    const attachment=await db.attachment.delete({
        where:{
            courseId:params.courseid,
            id:params.attachmentid
        }
    });

    return NextResponse.json(attachment)
    

  } 
  catch (error) {
    console.log('ATTACHMENT id',error);
    return new NextResponse('Internal Error',{status:500})
  }
}