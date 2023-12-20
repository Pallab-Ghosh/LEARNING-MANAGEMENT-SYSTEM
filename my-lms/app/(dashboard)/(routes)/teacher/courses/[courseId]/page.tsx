import { db } from "@/lib/db"
import { type } from "os"

type course_page_params={
    params:{
        courseId:string
    }
}

const Coursepage = async({params}:course_page_params) => {
  // console.log(params)
 const course=await db.course.findUnique({
    where :{id:params.courseId}
 })
  return (
    <div>Courseid {params.courseId}</div>
  )
}

export default Coursepage