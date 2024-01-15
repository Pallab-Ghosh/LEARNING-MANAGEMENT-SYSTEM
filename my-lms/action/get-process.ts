import { Category, Course } from '@prisma/client';
import { getProgress } from '@/action/get-progress';
import { db } from '@/lib/db';


type CourseWithProgressWithCategory=Course & {
    category : Category | null;
    chapters : {
        id:string
       }[];
    progress:number | null
       
  }

  type getcourses={
    userId:string,
    title:string,
    categoryId?:string
  }

  export const getCourse=async({userId,title,categoryId}:getcourses):Promise<CourseWithProgressWithCategory> =>{
   try 
   {
      const courses=await db.course.findMany({
        where:{
            isPublished:true,
            title:{
                contains:title
            },
            categoryId:categoryId
        },

        include:{
                category:true,
                chapters:{
                        where:{ isPublished:true},
                        select:{ id:true}
                },
                purchases:{
                    where:{userId} 
                }
        },
       orderBy:{
        createdAt:'desc'
       }

      })
   } 
   catch (error) {
    console.log('Get_courses',error)
    return [];
   }
  }