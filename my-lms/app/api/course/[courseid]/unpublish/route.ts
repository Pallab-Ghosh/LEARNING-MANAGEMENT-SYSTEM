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
          where:{  id:params.courseid, userId},
            
        })

        if(!course)
        {
            return new NextResponse('Not found',{status:404})
        } 
        
  
        
         const unpublishedCourse=await db.course.update({
            where:{id:params.courseid,userId },
            data:{isPublished:false}
         })

         return NextResponse.json(unpublishedCourse)

        }


      catch (error) {
        console.log('[course_ID_Unpublished ]',error)
        return new NextResponse('Internal Error',{status:500})
    }
    }
