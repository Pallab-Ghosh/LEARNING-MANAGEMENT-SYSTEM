
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { type } from "os";

type params_type={
    params:{
        courseid:string
    }
}

export async function PUT(req:Request,{params}:params_type)
 {
    try 
    {
        const {userId}=auth()
       

        if(!userId)
        {
            return new NextResponse('Unauthorized',{status:401})
        }

        const {list}=await req.json()
        console.log(list)

        const courseOwner=await db.course.findUnique({
            where:{
                id:params.courseid,
                userId:userId
            },
         
        })

        if(!courseOwner)
        return new NextResponse('Unauthorized',{status:401})
        
        
        for(let item of list)
        {
            await db.chapter.update({
                where:{ id:item.id},
                data:{position:item.position}
            })
        }
        return new NextResponse('successfully updated',{status:200})
    }


    catch (error)
    {
        console.log('[Reorder]',error)
        return new NextResponse('Internal Error',{status:500})

    }


 }