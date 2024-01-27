"use client"

import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
 
import { useState } from 'react';
import toast from 'react-hot-toast';
 
type CourseProgrssButtonProps={
    chapterId:string,
    courseId:string,
    nextChapterId :string,
    isCompleted:boolean
}
const CourseProgrssButton = ({chapterId,courseId,nextChapterId,isCompleted}:CourseProgrssButtonProps) => {
  
    const Icon=isCompleted ? XCircle : CheckCircle

    const router=useRouter()
    const confetti=useConfettiStore();
    const[isloading,setloading]=useState(false)

    const onclick=async()=>{
       try 
       {
                    setloading(true)
                    await axios.put(`/api/course/${courseId}/chapters/${chapterId}/progress`,{
                        isCompleted:!isCompleted
                    });

                    if(!isCompleted && !nextChapterId)//in video !isCompleted
                        {
                            confetti.onOpen();
                        }

                    if(!isCompleted && nextChapterId)//in video !isCompleted
                        {
                            router.push(`/course/${courseId}/chapters/${nextChapterId}`)
                        }

                    toast.success('Progress updated');
                    router.refresh();
       }


       catch (error) {
         toast.error('Something went wrong');
       }
       finally{
        setloading(false)
       }
    }

    return (
    <Button
     type='button'
     disabled={isloading}
     variant={isCompleted ? 'outline' :'success'}
     className=' w-full  md:ml-auto'
     onClick={onclick}
    >
         {
            isCompleted ? 'Completed' : 'Mark as Complete'
         }
         <Icon className='h-4 w-4 ml-2'/>
        </Button>
  )
}

export default CourseProgrssButton