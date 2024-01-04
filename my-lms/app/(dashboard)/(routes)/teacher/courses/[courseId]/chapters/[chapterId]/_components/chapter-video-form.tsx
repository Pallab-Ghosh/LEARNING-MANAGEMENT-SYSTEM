'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {Form,FormControl,FormItem,FormField,FormMessage, FormLabel, FormDescription} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
 
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course, MuxData } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'
import { cn } from '../../../../../../../../../lib/utils';
 
import MuxPlayer from '@mux/mux-player-react'


type ChapterVideoProps={
    initialData: Chapter & { muxData ?:MuxData | null}
    courseId:string,
    chapterId:string
}


const formSchema=z.object({
    videoUrl:z.string().min(1)
})


const ChapterVideoForm = ({initialData,courseId,chapterId}:ChapterVideoProps) => {

const[isEditing,setEditting]=useState(false);
const router=useRouter()

const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       //alert(values.imageUrl)
      try {
        await axios.patch(`/api/course/${courseId}/chapters/${chapterId}`,values)
        toast.success('Chapter Updated')
        toggleEdit()
        window.location.reload();
      }
        catch (error) {
           toast.error('Something went wrong')
        }
}



const toggleEdit=()=>{
  setEditting((current)=>!current)
}

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>

            <div className='font-medium flex items-center justify-between'>
                  Chapter Video
                  <Button onClick={toggleEdit}>
                    { isEditing && ( <>Cancel</>)}
                    {!isEditing && !initialData.videoUrl && (<>  <PlusCircle className='h-4 w-4 mr-2'/>  Add a Video  </> )}
                    {!isEditing && initialData.videoUrl && (<><Pencil className='h-4 w-4 mr-2'/>Edit Video </> )}
                    </Button>
            </div>

            {
              !isEditing &&(
                !initialData.videoUrl ?
                 (<div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                      <Video className='h-10 w-10 text-slate-500'/>
                 </div>) :
                 (
                   <div className='relative aspect-video mt-2'>
                      <MuxPlayer
                       playbackId={initialData?.muxData?.playbackId || ""}
                      />
                    </div>
                 )
              )}

              {
                isEditing && (
                  <div>
                    <FileUpload endpoint='chapterVideo'
                      onChange={(url)=>{
                         if(url){
                          onSubmit({videoUrl:url})
                         }
                    }}/>

                    <div className='text-xs text-muted-foreground mt-4'>
                       Upload this chapter's Video
                    </div>
                    {
                    initialData.videoUrl && !isEditing && (
                      <div className=' text-xs text-muted-foreground gap-x-2'>
                        Videos can take a few minutes to process.Refresh the page if video does not appear
                      </div>
                    )
                    
                    }
                    </div>
                )}
    </div>
  )
}

export default ChapterVideoForm