import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { AlertCircle, ArrowLeft, Eye, LayoutDashboard, LucideLayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation"
import { type } from 'os';
import ChapterTitleForm from "./_components/chapter_title_form";
import ChapterDescriptionForm from "./_components/chapter-description_form";
import ChapterAccessForm from "./_components/chapter-access_form";
import ChapterVideoForm from "./_components/chapter-video-form";
 

 
type ChapterIdPageparams={
    params:{
        courseId:string,
        chapterId:string
    }
}



const ChapterIdPage = async({params}:ChapterIdPageparams) => {

const {userId}=auth();

if(!userId)
{
    return redirect('/');
}

 const chapter=await db.chapter.findUnique({
    where :{
        id:params.chapterId,
        courseId:params.courseId
    },
    include:{
        muxData:true
    }
 })

 if(!chapter)
 {
   return redirect('/')
 }

 const requiredFields=[chapter.title,chapter.description,chapter.videoUrl];

 const totalFields=requiredFields.length;
 const completedFields=requiredFields.filter(Boolean).length


 const completionText=`(${completedFields}/${totalFields})`;

  return (
    <>
    {
      !chapter.isPublished && (
      <h2 className=" bg-yellow-200 h-12 flex items-center gap-x-1 text-slate-800">
          <AlertCircle className='ml-3' />
        <div>This course chapter is not published.It will not be visible in the course </div>
        </h2>
      )
    }
    <div className=" p-6 ">
         <div className=" flex items-center justify-between">
            <div className="w-full">
               <Link 
               href={`/teacher/courses/${params.courseId}`}
               className=" flex items-center text-sm hover:opacity-75 transition mb-6" >
               <ArrowLeft className=" h-4 w-4 mr-2"/>
                 Back to Course Setup
               </Link>

               <div className=" flex items-center justify-between w-full">
                   <div className=" flex flex-col gap-y-2">
                      <h1 className="text-2xl font-medium">Chapter Creation </h1>

                      <span className=" text-sm text-slate-700">
                        Complete all Fields {completionText}
                        </span>
                   </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
               <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}  variant='default'/>
                                <h2 className=" text-xl">
                                Customize your Chapter
                                </h2>
                        </div>
                        <ChapterTitleForm
                        initialData={chapter}
                        chapterId={params.chapterId}
                        courseId={params.courseId}
                        />

                        <ChapterDescriptionForm
                         initialData={chapter}
                         chapterId={params.chapterId}
                         courseId={params.courseId}
                        />
                    </div>
                       <div>
                           <div className="flex items-center gap-x-2">
                               <IconBadge icon={Eye}/>
                               <h2 className="text-xl">
                                    Access Settings
                               </h2>
                           </div>
                           <ChapterAccessForm
                           initialData={chapter}
                           courseId={params.courseId}
                           chapterId={params.chapterId}
                           />
                       </div>
               </div>

               <div>
                 <div className="flex items-center gap-x-2">
                            <IconBadge icon={Video}  variant='default'/>
                                <h2 className=" text-xl">
                                  Add a Video
                                </h2>
                 </div>
                 <ChapterVideoForm
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  initialData={chapter}
                 />
               </div>
        </div>

    </div>
    </>
  )
}

export default ChapterIdPage