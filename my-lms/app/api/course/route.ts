import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"



export async function POST(req:Request,params:{params:string})
{
  try {
    const{userId}=auth();
    const{title}=await req.json();
    if(!userId)
    {
        return new NextResponse('Unauthorized',{status:401})
    }
    console.log('params',params)
  
    const course=await db.course.create({
        data:{userId, title }
    });
   // console.log("course save in POST",course);
    return NextResponse.json(course)


  } 
  catch (error) {
    console.log('[courses]',error)
    return new NextResponse('Internal Error',{status:500})
  }
}