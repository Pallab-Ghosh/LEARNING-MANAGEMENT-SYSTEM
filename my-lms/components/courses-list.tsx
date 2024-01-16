import { CourseWithProgressWithCategory } from "@/action/get-courses"

 
type CoursesListProps ={
    items:CourseWithProgressWithCategory[]
}
const CoursesList = ({items}:CoursesListProps) => {
  return (
    <div>
        {
            items.map((item)=>(
                <div key={item.id}>
                    <div>{item.title}</div>
                </div>
            ))
        }
    </div>
  )
}

export default CoursesList