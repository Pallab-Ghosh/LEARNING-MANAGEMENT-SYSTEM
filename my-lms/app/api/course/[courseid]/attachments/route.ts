import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type params_type={
    params:{
        courseid:string
    },
    req:Request
}

export async function POST(req:Request,{params}:params_type){
  try 
  {
    const {userId}=auth();
    const {url}=await req.json();

    if(!userId)return new NextResponse('Unauthorized',{status:401});

    const courseOwner=await db.course.findUnique({
        where:{id:params.courseid,userId:userId}
    })

    if(!courseOwner)return new NextResponse('Unauthorized',{status:401});

    const attachment=await db.attachment.create({
        data:{
            url,
            name:url.split('/').pop(),
            courseId:params.courseid
        }
    });

    return NextResponse.json(attachment)
    

  } 
  catch (error) {
    console.log('COURSE_ID_ATTACHMENTS',error);
    return new NextResponse('Internal Error',{status:500})
  }
}