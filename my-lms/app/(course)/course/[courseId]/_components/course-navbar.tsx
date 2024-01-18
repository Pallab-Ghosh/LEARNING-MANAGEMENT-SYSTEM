import { Chapter, Course, UserProgress } from "@prisma/client"


type CourseNavbarProps={
    course: Course & {
        chapters:(Chapter & {
            userProgress:UserProgress[] | null 
        })[]
    },
    progressCount:number
}

const CourseNavbar = ({course,chapters}:CourseNavbarProps) => {
  return (
    <div>course-navbar</div>
  )
}

export default CourseNavbar