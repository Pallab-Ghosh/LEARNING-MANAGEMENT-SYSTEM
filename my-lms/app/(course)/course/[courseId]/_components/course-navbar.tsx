import NavbarRoutes from "@/components/navbar-routes"
import { Chapter, Course, UserProgress } from "@prisma/client"


type CourseNavbarProps={
    course: Course & {
        chapters:(Chapter & {
            userProgress:UserProgress[] | null 
        })[]
    },
    progressCount:number
}

const CourseNavbar = ({course,progressCount}:CourseNavbarProps) => {
  return (
    <div>
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar