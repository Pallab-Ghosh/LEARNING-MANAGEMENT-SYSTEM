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
    <div className= " mr-4 border-b h-full flex items-center bg-white shadow-sm">
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar