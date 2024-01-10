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

export async function PATCH(req:Request,{params}:params_props) {
    try {
        
    const {userId}=auth();
      
    if(!userId) return new NextResponse('Unauthorized',{status:403});

    const courseOwner=await db.course.findUnique({
        where:{ id:params.courseid,  userId:userId}
    })

    if(!courseOwner)return new NextResponse('Unauthorized',{status:403})
     
    const chapter=await db.chapter.findUnique({
        where: { id:params.chapterId, courseId:params.courseid},
     })

     const muxData=await db.muxData.findUnique({
        where:{
            chapterId:params.chapterId
        }
     })

     if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl)
     {
        return new NextResponse('Missing Required Fields',{status:400})
     }

      const publishedChapter=await db.chapter.update({

        where:{
            id:params.chapterId,
            courseId:params.courseid
        },
        data:{
            isPublished:true
        }
      })

      return NextResponse.json(publishedChapter)
    } 


    catch (error) {
         console.log('[Chapter publish Error]',error)
        return new NextResponse('Internal Error',{status:500})
    }
}