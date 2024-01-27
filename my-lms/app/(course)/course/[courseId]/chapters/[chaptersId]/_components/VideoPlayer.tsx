"use client"

import { useConfettiStore } from "@/hooks/use-confetti-store"
import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import axios from "axios"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

 type VideoPlayerProps={
    chapterId:string,
    title:string
    courseId:string
    nextchapterId:string
    playbackId:string
    isLocked:boolean
    completeOnEnd:boolean
 }

const VideoPlayer = ({ chapterId,title,courseId,nextchapterId ,playbackId ,isLocked ,completeOnEnd}:VideoPlayerProps) => {

        const[isready,setready]=useState(false)
         const confetti=useConfettiStore();
         const router=useRouter()
        const onEnd=async()=>{
         
          try {
                if(completeOnEnd)
                {
                      await axios.put(`/api/course/${courseId}/chapters/${chapterId}/progress`,{
                        isCompleted:true
                    });
                     

                     if(!nextchapterId)
                     {
                      confetti.onOpen();
                      toast.success('You have successfully completed the course')
                     }
                        

                     toast.success('Progress updated');
                     router.refresh();

                     if(nextchapterId)
                     {
                      router.push(`/course/${courseId}/chapters/${nextchapterId}`)
                     }
                      
        
                }
          } 

          catch (error) {
            toast.error('Something went wrong');
          }


        }



  return (
    <div className=" relative aspect-video">
      {
        !isready && !isLocked && (
            <div className=" absolute inset-0 flex items-center justify-center bg-slate-400">
               <Loader2 className=" h-8 w-8 animate-spin text-secondary"/>
            </div>
        )
      }

      {
        isLocked && (
            <div className=" absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
              <Lock className=" h-8 w-8 "/>
              <p className="text-small font-bold">
                This chapter is locked
              </p>
            </div>
        )
      }

      {
        !isLocked &&(
            <MuxPlayer
             title={title}
             className={cn(!isready && "hidden")}
             onCanPlay={()=>setready(true)}
             onEnded={onEnd}
             autoPlay
             playbackId={playbackId}
            />
        )
      }
    </div>
  )
}

export default VideoPlayer