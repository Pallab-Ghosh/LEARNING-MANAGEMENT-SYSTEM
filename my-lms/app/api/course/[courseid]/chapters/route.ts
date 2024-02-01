import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { type } from "os";

type params_type={
    params:{
        courseid:string
    }
}

export async function POST(req:Request,{params}:params_type)
 {
    try 
    {
        const {userId}=auth()
        const {title}=await req.json()

        if(!userId || isTeacher(userId))
        {
            return new NextResponse('Unauthorized',{status:401})
        }

        const courseOwner=await db.course.findUnique({
            where:{
                id:params.courseid,
                userId:userId
            }
        })

        if(!courseOwner)return new NextResponse('Unauthorized',{status:401})
        
        const lastChapter=await db.chapter.findFirst({
            where:{
                courseId:params.courseid
            },
            orderBy:{
                position:'desc'
            }
        })

    const newPosition=lastChapter ? lastChapter.position+1 : 1;

    const chapter=await db.chapter.create({
        data:{
            title,
            courseId:params.courseid,
            position:newPosition
        }
    })
  
      return NextResponse.json(chapter)
     
    }


    catch (error)
    {
        console.log('[Chapter]',error)
        return new NextResponse('Internal Error',{status:500})

    }


 }