"use client"

import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import { Loader2, Lock } from "lucide-react"
import { useState } from "react"

 type VideoPlayerProps={
    chaperId:string,
    title:string
    courseId:string
    nextchapterId:string
    playbackId:string
    isLocked:boolean
    completeOnEnd:boolean
 }

const VideoPlayer = ({ chaperId,
    title,
    courseId,
    nextchapterId ,
    playbackId ,
    isLocked ,
    completeOnEnd}:VideoPlayerProps) => {

        const[isready,setready]=useState(false)
        console.log(playbackId)
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
             onEnded={()=>{}}
             autoPlay
             playbackId={playbackId}
            />
        )
      }
    </div>
  )
}

export default VideoPlayer