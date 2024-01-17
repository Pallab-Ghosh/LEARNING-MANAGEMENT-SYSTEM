import { Chapter, Course, UserProgress } from '@prisma/client';
import { CourseWithProgressWithCategory } from '../../../../../action/get-courses';



type CourseSidebarProps={
    course: Course & {
        chapters:(Chapter & {
            userProgress:UserProgress[] | null 
        })[]
    },
    progressCount:number
}

const CourseSidebar = ({course,progressCount}:CourseSidebarProps) => {
  return (
    <div>course-sidebar</div>
  )
}

export default CourseSidebar