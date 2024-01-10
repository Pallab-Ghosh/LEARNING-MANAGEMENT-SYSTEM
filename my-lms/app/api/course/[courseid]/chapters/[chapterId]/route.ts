import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { type } from "os";
import Mux from '@mux/mux-node'



type params_props={
    params:{
        courseid:string,
        chapterId:string
    }
}


const muxTokenId = process.env.MUX_TOKEN_ID;
const muxTokenSecret = process.env.MUX_TOKEN_SECRET;

const {Video}=new Mux( muxTokenId!,muxTokenSecret!);



export async function DELETE(req:Request,{params}:params_props)
{

    try 
    {

        const {userId}=auth();
      
    if(!userId) return new NextResponse('Unauthorized',{status:403});

    const courseOwner=await db.course.findUnique({
        where:{ id:params.courseid,  userId:userId}
    })

    if(!courseOwner)return new NextResponse('Unauthorized',{status:403})

      const chapter=await db.chapter.findUnique({
         where: { id:params.chapterId, courseId:params.courseid},
      })

      if(!chapter)
      {
        return new NextResponse('Not Found',{status:404})
      }
        
      if(chapter.videoUrl)
      {
            const existingMuxdata=await db.muxData.findFirst({
                where:{
                    chapterId:params.chapterId
                }
            })

            if(existingMuxdata)
            {
                await Video.Assets.del(existingMuxdata.assetId)
                await db.muxData.delete({
                    where:{
                        id:existingMuxdata.id
                    }
                })
            }
      }
       
      const deleted_chapter=await db.chapter.delete({
        where:{
            id:params.chapterId
        }
      })

      const publishedChapterInCourse=await db.chapter.findMany({
        where:{
            courseId:params.courseid,
            isPublished:true,
        }
      })

      if(!publishedChapterInCourse.length)
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
     return NextResponse.json(deleted_chapter);
    } 

    catch (error) {
        console.log('[Chapter delete Error]',error)
        return new NextResponse('Internal Error',{status:500})
    }
}




export async function PATCH(req:Request,{params}:params_props)
{

    try 
    {

     
        
        const {userId}=auth();
        const {isPublished , ...values}=await req.json();
         console.log(values)


    if(!userId) return new NextResponse('Unauthorized',{status:403});

    const courseOwner=await db.course.findUnique({
        where:{ id:params.courseid,  userId:userId}
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
               
                console.log('asset',asset)
            
        
            await db.muxData.create({
                data:{
                    chapterId:params.chapterId,
                    assetId:asset.id,
                    playbackId:asset.playback_ids?.[0]?.id,
                }
                })
                
      }
      return  NextResponse.json(chapter)
     
    } 

    catch (error) {
        console.log('[Chapter Video Error]',error)
        return new NextResponse('Internal Error',{status:500})
    }
}