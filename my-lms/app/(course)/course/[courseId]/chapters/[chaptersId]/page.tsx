 
import { getChapter } from "@/action/get-chapter"
import { db } from "@/lib/db"
import { auth, useAuth } from "@clerk/nextjs"
import { AlertTriangle, ArrowRight, ArrowRightCircle, CheckCircle, File, Home, Link2 } from "lucide-react"
import { redirect } from "next/navigation"
import VideoPlayer from "./_components/VideoPlayer"
import CourseEnrollButton from './_components/course-enroll-button';
import { Separator } from "@/components/ui/separator"
import { Preview } from "@/components/preview"
import Link from "next/link"
import CourseProgrssButton from "./_components/course-progress-button"
import CourseCertificate from "./_components/course-certificate"
import { getProgress } from "@/action/get-progress"
import { Button } from "@/components/ui/button"
 
import { currentUser } from '@clerk/nextjs';
 


type ChaptersPlayepageProps={
    params:{
        chaptersId:string,
        courseId:string
    }
}

const ChaptersPlayerpage = async({params}:ChaptersPlayepageProps)=> {
 
 const {userId}=auth();

 if(!userId)return redirect('/');
 
  const current_user_object = await currentUser();
  const current_user = `${current_user_object?.firstName} ${current_user_object?.lastName}`

   const{chapter,course,muxdata,attachments,nextChapter,userProgress,purchase}=await getChapter({userId:userId,courseId:params.courseId,chapterId:params.chaptersId})
   const progress=await getProgress({userId:userId!, courseId:params.courseId})
 

   if(!chapter || !course)
   {
    console.log('chapter or course not found')
    return redirect('/');
   }

   const isLocked=!chapter.isFree && !purchase
   const completeOnEnd=!!purchase && !userProgress?.isCompleted
  


  return (
    <div>
      {
        userProgress?.isCompleted && (
            <h1 className=" bg-lime-500 h-12 flex items-center gap-x-1 text-slate-800">
              
                  <CheckCircle /> 
                <div className=" ml-1"> You have already completed the chapter</div>
           </h1>
        )
      }

      {
        isLocked && (
          <h1 className=" bg-yellow-200 h-12 flex items-center justify-center gap-x-1 text-slate-800">
             <AlertTriangle />
            <div className=" ml-1"> You need to purchase this course to watch this chapter</div>
         </h1>
        )
      }

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div className="p-4">
                  <VideoPlayer
                  chapterId={params.chaptersId}
                  title={chapter.title}
                  courseId={params.courseId}
                  nextchapterId={nextChapter?.id!}
                  playbackId={muxdata?.playbackId!}
                  isLocked={isLocked}
                  completeOnEnd={completeOnEnd!}
                  />
              </div>

              <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">

                        <h2 className=" text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {
                          purchase ? (
                            <div>
                                <CourseProgrssButton
                                 chapterId={params.chaptersId}
                                 courseId={params.courseId}
                                 nextChapterId={nextChapter?.id!}
                                 isCompleted={!!userProgress?.isCompleted}
                                  progress={progress}
                                />
                              </div>
                          ):
                          (
                              <CourseEnrollButton
                              price={course.price!}
                              courseId={params.courseId}
                              />
                          )
                        }
                    </div>

                    <Separator/>

                      <div>
                          <Preview value ={chapter.description!}/>
                      </div>

               {
                !!attachments.length && (
                  <>
                      <Separator/>
                      <div className=" p-4">

                      {
                          attachments.map((attachment_val)=>(
                            <Link
                            href={attachment_val.url}
                            target="_blank"
                            key={attachment_val.id}
                            className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                            >
                              <File/>
                              <p className="line-clamp-1"> 
                                {attachment_val.name}
                              </p>
                            </Link>
                          ))
                      }
                      </div>
                  </>
                )
               }
               <div>
                  <Separator/>
                
                    {
                    (userProgress?.isCompleted!  && progress === 100) ?
                       (
                       <CourseCertificate
                          chapterId={params.chaptersId}
                          courseId={params.courseId}
                          nextChapterId={nextChapter?.id!}
                          isCompleted={!!userProgress?.isCompleted}
                          courseName={course.title}
                          current_user = {current_user!}
                      />
                      ):null
                    }


               </div>
          
        </div>
      </div>
    </div>
  )
}

export default ChaptersPlayerpage