import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { type } from "os";


type params_props={
    params:{
        courseid:string,
        chapterId:string
    }
}

export async function PATCH(req:Request,{params}:params_props){
    
    try 
    {
        const {userId}=auth();
        const {isPublished , ...values}=await req.json();


    if(!userId)
    return new NextResponse('Unauthorized',{status:401});

    const courseOwner=await db.course.findUnique({
        where:{
            id:params.courseid,
            userId:userId
        }
    })

    if(!courseOwner)return new NextResponse('Unauthorized',{status:401})

      const chapter=await db.chapter.update({
         where: {
            id:params.chapterId,
           courseId:params.courseid
         },
         data:{...values}
      })

      
      return NextResponse.json(chapter)
    } 


    catch (error) {
        
    }
}