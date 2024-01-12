'use client'

import { ConfirmModal } from "@/components/confirm-modal"
import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
 
import { type } from "os"
import { useState } from "react"
import toast from "react-hot-toast"



type CourseActionProps={
    disabled:boolean,
    courseId:string,
    isPublished:boolean
}


export const CourseAction=({disabled,courseId,isPublished}:CourseActionProps)=>{

    const[isLoading,setIsLoading]=useState(false)
    const router=useRouter()
    const confetti=useConfettiStore()
   
   const onDelete= async()=>{
        try {
            setIsLoading(true);
            axios.delete(`/api/course/${courseId}`)
            toast.success('Course Deleted');
            router.push('/teacher/courses')
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
                       const datas=await axios.patch(`/api/course/${courseId}/unpublish`)
                       console.log('datas.data',datas.data)
                        toast.success('Course UnPublished');
                    }

                    else{
                        const datas=await axios.patch(`/api/course/${courseId}/publish`)
                        toast.success('Course Published');
                        confetti.onOpen()
                    }
                    router.refresh()
          
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