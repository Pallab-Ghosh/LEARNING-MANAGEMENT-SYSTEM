import { CourseWithProgressWithCategory } from "@/action/get-courses"
import CourseCard from "./course-card"

 
type CoursesListProps ={
    items:CourseWithProgressWithCategory[]
}
const CoursesList = ({items}:CoursesListProps) => {
  return (
   <div>
            <div className=" grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {
                items.map((item)=>(
                   <CourseCard
                   key={item.id}
                   id={item.id}
                   title={item.title}
                   imageUrl={item.imageUrl!}
                   chaptersLength={item.chapters.length}
                   price={item.price!}
                   progress={item.progress}
                   category={item?.category?.name}
                   />
                ))
            }
        </div>
      
      <div className=" text-center text-sm text-muted-foreground mt-10">
        {
            items.length ===0 && (
                <div>No Courses Found</div>
            )
        }
      </div>
   </div>
  )
}

export default CoursesList