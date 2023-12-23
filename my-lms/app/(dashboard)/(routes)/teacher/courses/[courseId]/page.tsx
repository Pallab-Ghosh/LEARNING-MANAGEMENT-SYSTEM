import { IconBadge } from "@/components/icon-badge"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { LayoutDashboard } from "lucide-react"
import { redirect } from "next/navigation"
import { type } from "os"
import TitleForm from "./_component/title_form"
import DescriptionForm from "./_component/description_form"
import ImageForm from "./_component/image-form"

type course_page_params={
    params:{
        courseId:string
    }
}

const Coursepage = async({params}:course_page_params) => {
  // console.log(params)
  const {userId}=auth();
    
  if(!userId)
  {
    return redirect('/')
  }

 const course=await db.course.findUnique({
    where :{id:params.courseId}
 })

 const categories=await db.category.findMany({
  orderBy:{
   name:'asc'
  }
})

if(categories) 
{
  console.log(categories);
}


 if(!course)
 {
  return redirect('/')
 }

const requiredFields=[course.title,course.description,course.imageUrl,course.price,course.categoryId];
const totalFields=requiredFields.length;
const completedField=requiredFields.filter(Boolean).length

/* console.log('totalFields',totalFields)
console.log('completedField',completedField) */

const completionText=`(${completedField} / ${totalFields})`

//console.log('completionText',completionText)

  return (
    <div className="p-6">
         <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Course Setup
                        </h1>

                        <span className="text-sm text-slate-700">
                          Complete all fields {completionText}
                        </span>
                </div>

         </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
               <div>
                        <div className="flex items-center gap-x-2">
                          <IconBadge icon={LayoutDashboard}  variant='default'/>
                              <h2>
                                Customize your course
                              </h2>
                        </div>
                        <TitleForm initialData={course}  courseId={course.id}/>
                        <DescriptionForm initialData={course}  courseId={course.id}/>
                        <ImageForm initialData={course}  courseId={course.id}/>
               </div>
           </div>

      </div>
  )
}

export default Coursepage