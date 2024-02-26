"use client"

import { getProgress } from '@/action/get-progress';
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
 
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
 
import { useState } from 'react';
import toast from 'react-hot-toast';
 
type CourseProgrssButtonProps={
    chapterId:string,
    courseId:string,
    nextChapterId :string,
    isCompleted:boolean,
    progress:number
}
const CourseProgrssButton = ({chapterId,courseId,nextChapterId,isCompleted,progress}:CourseProgrssButtonProps) => {
  
    const Icon=isCompleted ? XCircle : CheckCircle

    const router=useRouter()
    const confetti=useConfettiStore();
    const[isloading,setloading]=useState(false)
    const {userId}=useAuth()
    
 

    const onclick=async()=>{
       try 
       {
                 
                    setloading(true)
                    await axios.put(`/api/course/${courseId}/chapters/${chapterId}/progress`,{
                        isCompleted:!isCompleted
                    });
                     
                   

                    if(!isCompleted && !nextChapterId )//in video !isCompleted
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
     className=' w-full text-gray-200 md:ml-auto bg-blue-500 transition ease-in-out duration-150 delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  hover:text-slate-200'
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