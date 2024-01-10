'use client'

import { ConfirmModal } from "@/components/confirm-modal"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
 
import { type } from "os"
import { useState } from "react"
import toast from "react-hot-toast"


type chapteractionprops={
    disabled:boolean,
    courseId:string,
    chapterId:string,
    isPublished:boolean
}


export const ChapterAction=({disabled,courseId,chapterId,isPublished}:chapteractionprops)=>{

    const[isLoading,setIsLoading]=useState(false)
    const router=useRouter()


   const onDelete= async()=>{
        try {
            setIsLoading(true);
            axios.delete(`/api/course/${courseId}/chapters/${chapterId}`)
            toast.success('Chapter Deleted');
            router.push('/')
        }
         catch (error) {
            toast.error('Something went wrong')
        }
        finally{
            setIsLoading(false);
        }
   }

  const onClick=async()=>{
        try {
                    setIsLoading(true);
                    
                    if(isPublished)
                    {
                        axios.patch(`/api/course/${courseId}/chapters/${chapterId}/unpublish`)
                        toast.success('Chapter UnPublished');
                    }

                    else{
                        axios.patch(`/api/course/${courseId}/chapters/${chapterId}/publish`)
                        toast.success('Chapter Published');
                    }
            window.location.reload();
        }
         catch (error) {
            toast.error('Something went wrong')
        }
        finally{
            setIsLoading(false);
        }
   }
  

    return(
        <div className=" flex items-center gap-x-2">
            <Button onClick={onClick} disabled={isLoading || disabled} variant='default' size='sm' >
                {
                    isPublished ? 'Unpublished':'Publish'
                }
            </Button>

              <ConfirmModal onConfirm={onDelete}>
                    <Button size='sm' disabled={isLoading}> <Trash className='h-4 w-4' /> </Button>
                </ConfirmModal>
        </div>
    )
}