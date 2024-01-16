import { db } from '../lib/db';


type progressProps={
  userId:string,
  courseId:string
}

export const getProgress=async({userId,courseId}:progressProps):Promise<number> =>{
  try
   {
     const PublishedChapter=await db.chapter.findMany({
        where:{
            courseId:courseId,
            isPublished:true
        },
        select:{
            id:true
        }

     })

     const publishedchapterIds=PublishedChapter.map((chapter_value)=>chapter_value.id)

     const validcompletedChapters=await db.userProgress.count({
        where:{
            userId:userId,
            chapterId:{
                in:publishedchapterIds
            },
            isCompleted:true,
        }
     })

     const progressPercentage=(validcompletedChapters/publishedchapterIds.length) * 100 ;
     return progressPercentage

  } 
  catch (error) {
    console.log('get Progress',error)
    return 0;
  }
}