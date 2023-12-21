import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


type params_type={
    params:{
        courseid:string
    }
}

export async function PATCH(req:Request,{params}:params_type)
{
    try 
    {
        const {userId}=auth();
        const {courseid}=params;
        const values=await req.json();

        if(!userId){
            return new NextResponse('Unauthorized',{status:401})
        }

   const course=await db.course.update({ where:{id : courseid, userId : userId}, data : {...values}})
   return NextResponse.json(course)
    } 
    catch (error) {
       console.log('[COURSE_ID],error')
       return new NextResponse ('Internal Error',{status:500})
    }
}