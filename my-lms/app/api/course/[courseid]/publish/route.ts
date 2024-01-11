import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"
import { Chapter } from '@prisma/client';
import { db } from "@/lib/db";
import { hasCustomGetInitialProps } from "next/dist/build/utils";


type params_props={
    params:{
        courseid:string
    }
}


export async function PATCH(req:Request,{params}:params_props)

{
      try 
      {
        const {userId}=auth()
        if(!userId)
        {
            return new NextResponse('Unauthorized',{status:401})
        }
        const course=await db.course.findUnique({
          where:{  id:params.courseid, userId },
          include:{
            chapters:{
                include:{
                    muxData:true
                }
            }
          }
            
        })

        if(!course)
        {
            return new NextResponse('Not found',{status:404})
        } 
        
        const hasPublishedChapter=course.chapters.some((chapter)=>chapter.isPublished)

        if(!course.title || !course.description ||  !course.imageUrl || course.categoryId || !hasPublishedChapter || !course.price)
        {
            return new NextResponse('Missing Required Fields',{status:401})

        } 
  
         const publishedCourse=await db.course.update({
            where:{ id:params.courseid,userId},
            data:{ isPublished:true}
         })

         return NextResponse.json(publishedCourse)

        }


      catch (error) {
        console.log('[course_ID_Published ]',error)
        return new NextResponse('Internal Error',{status:500})
    }
    }
