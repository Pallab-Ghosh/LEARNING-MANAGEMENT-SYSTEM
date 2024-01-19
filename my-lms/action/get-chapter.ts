import { db } from '@/lib/db';
import { Attachment, Chapter ,MuxData } from '@prisma/client';


type GetChapterProps={
    userId:string,
    courseId:string,
    chapterId:string
}

export const getChapter=async({userId,courseId,chapterId}:GetChapterProps)=>{
   try
    {
         const purchase=await db.purchase.findUnique({
            where:{
               userId_courseId:{
                userId:userId,
                courseId:courseId
               }
            }
         })

         const course=await db.course.findUnique({
            where:{
                isPublished:true,
                id:courseId
            },
            select:{
                price:true
            }
         })

         const chapter=await db.chapter.findUnique({
            where:{
                id:courseId,
                isPublished:true
            }
         })

         if(!chapter || !course)
         {
            throw new Error("Chapters ot Course not found")
         }

         let muxdata=null;
         let attachments:Attachment[]=[];
         let nextChapter:Chapter| null = null;

         if(purchase)
         {
                attachments=await db.attachment.findMany({
                where:{
                    courseId:courseId
                }
                })
         }

         if(chapter.isFree || purchase)
         {
            muxdata=await db.muxData.findUnique({
                where:{
                    chapterId:chapterId
                }
            });

            nextChapter=await db.chapter.findFirst({
                where:{
                   courseId:courseId,
                   isPublished:true,
                   position:{
                    gt:chapter?.position
                   }
                },
                orderBy:{
                    position:'asc'
                }
            })
         }

         const userProgress=await db.userProgress.findUnique({
            where:{
                userId_chapterId:{
                    userId,chapterId
                }
             }
            
         })

         return {chapter,course,muxdata,attachments,nextChapter,userProgress,purchase}
    }
    catch (error) {
     console.log("[Get_Chapter]",error);
     return{
        chapter:null,course:null,muxData:null,Attachment:[],nextChapter:null,userProgress:null,purchase:null
     }
   }

}