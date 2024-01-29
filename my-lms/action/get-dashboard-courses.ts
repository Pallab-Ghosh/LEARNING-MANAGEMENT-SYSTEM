import { db } from '@/lib/db';
import { Course, Category, Chapter } from '@prisma/client';
import { getProgress } from './get-progress';

type CourseWithProgressWithCategory=Course &{
  category:Category,
  chapters:Chapter[],
  progress:number | null

}

type DashboardCoursesProps={
    completedCourses:CourseWithProgressWithCategory[],
    coursesInProgress:CourseWithProgressWithCategory[]
}




export const getDashboardCourses=async(userId:string):Promise<DashboardCoursesProps>=>{

    try
     {
        const purchaseCourses=await db.purchase.findMany({

            where:{ userId:userId },
            select:{
                course:{
                    include:{
                        category:true,
                        chapters:{
                            where:{isPublished:true}
                        }
                    }
                }
            }
        })

        const courses=purchaseCourses.map((purchase_value)=>purchase_value.course) as
         CourseWithProgressWithCategory[];

         for(let course of courses)
         {
            const progress=await getProgress({userId,courseId:course.id});
            course["progress"]=progress;
         }
        // console.log('courses after add progress in getDashboardCourses',courses)

         const completedCourses=courses.filter((course_value)=>course_value.progress===100)
         const coursesInProgress=courses.filter((course_value)=>(course_value.progress ?? 0) < 100)
         //course_value.progress less than 100 or null then 0.
         

         return {
            completedCourses,
            coursesInProgress
         }

     } 
    catch (error) {
        console.log("[Get_Dashboard_Courses]",error)
        return {
            completedCourses:[],
            coursesInProgress:[]
        }
    }
}