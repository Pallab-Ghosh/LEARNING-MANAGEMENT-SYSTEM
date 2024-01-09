import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { type } from "os";
import Mux from '@mux/mux-node'


const muxTokenId = process.env.MUX_TOKEN_ID;
const muxTokenSecret = process.env.MUX_TOKEN_SECRET;





type params_props={
    params:{
        courseid:string,
        chapterId:string
    }
}

export async function PATCH(req:Request,{params}:params_props)
{

    try 
    {

        if (!muxTokenId || !muxTokenSecret) {
            return new NextResponse('Internal Server Error: Mux API credentials not provided.', { status: 500 });
        }
        
        const {Video}=new Mux( muxTokenId!,muxTokenSecret!);
        
        const {userId}=auth();
        const {isPublished , ...values}=await req.json();
         


    if(!userId)
    return new NextResponse('Unauthorized',{status:403});

    const courseOwner=await db.course.findUnique({
        where:{
            id:params.courseid,
            userId:userId
        }
    })

    if(!courseOwner)return new NextResponse('Unauthorized',{status:403})

      const chapter=await db.chapter.update({
         where: { id:params.chapterId, courseId:params.courseid},
         data:{...values}
      })

      if(values.videoUrl)
      {
        const existingMuxData=await db.muxData.findFirst({
             where:{ chapterId:params.chapterId }
        })
 
        

        if(existingMuxData)
        {
           await Video.Assets.del(existingMuxData.assetId);
           await db.muxData.delete({
            where:{id:existingMuxData.id}
           })
        }

        const asset=await Video.Assets.create({
            input:values.videoUrl,
            playback_policy:'public',
            test:false
        })

       
 
       const video= await db.muxData.create({
           data:{
            chapterId:params.chapterId,
            assetId:asset.id,
            playbackId:asset.playback_ids?.[0]?.id,
           }
        })
        return  NextResponse.json(video)
      }

     
    } 

    catch (error) {
        console.log('[Chapter Video Error]',error)
        return new NextResponse('Internal Error',{status:500})
    }
}