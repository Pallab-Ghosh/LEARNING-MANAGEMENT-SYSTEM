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
 
     
      const unpublishedChapter=await db.chapter.update({

        where:{
            id:params.chapterId,
            courseId:params.courseid
        },
        data:{
            isPublished:false
        }
      })


      const publishedchapterincourse=await db.chapter.findMany({
        where:{
            id:params.chapterId,
            isPublished:true
        },
       
      })

      

      if(publishedchapterincourse.length)
      {
         await db.course.update({
            where:{
                id:params.courseid
            },
            data:{
                isPublished:false
            }
         })
      }

      return NextResponse.json(unpublishedChapter)
       
    } 


    catch (error) {
         console.log('[Chapter unpublish Error]',error)
        return new NextResponse('Internal Error',{status:500})
    }
}