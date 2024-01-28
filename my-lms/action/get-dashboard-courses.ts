import { Course, Category, Chapter } from '@prisma/client';

type CourseWithProgressWithCategory=Course &{
  category:Category,
  chapters:Chapter[],
  progress:number | null

}

type DashboardCoursesProps={
    completedCourses:any[],
    coursesInProgress:any[]
}




export const getDashboardCourses=async():Promise<DashboardCoursesProps>=>{

}