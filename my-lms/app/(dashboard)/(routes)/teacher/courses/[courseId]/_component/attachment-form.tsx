'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {Form,FormControl,FormItem,FormField,FormMessage, FormLabel, FormDescription} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '../../../../../../../lib/utils';
import { Textarea } from '@/components/ui/textarea'
import { Attachment, Course } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'
 


type AttachmentFormProps={
    initialData:Course & {attachments:Attachment []};
    courseId:string;
}


const formSchema=z.object({
    url:z.string().min(1)
})


const AttachmentForm = ({initialData,courseId}:AttachmentFormProps) => {

const[isEditing,setEditting]=useState(false);


const router=useRouter()

const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       //alert(values.imageUrl)
      try {
       const fetchdata= await axios.post(`/api/course/${courseId}/attachments`,values)
       console.log(fetchdata.data)
        toast.success('Course Updated')
        toggleEdit();
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
              Course Attachments
                  <Button onClick={toggleEdit}>
                    { isEditing &&
                     ( <>
                       Cancel
                       </>
                     )
                     }

                    {
                    !isEditing 
                    &&
                    (
                        <> 
                          <PlusCircle className='h-4 w-4 mr-2'/> 
                           Add a File
                        </>
                    )
                    }

                    </Button>
            </div>

            {
              !isEditing &&
              (
                <>
                {
                initialData.attachments.length=== 0 && (
                  <p className='text-sm mt-2 text-slate-500 italic'> No attachments yet</p>
                ) }
                </>
              )}

              {
                isEditing && (
                  <div>
                    <FileUpload endpoint='courseAttachment'
                      onChange={(url)=>{
                         if(url){
                          onSubmit({url:url})
                         }
                    }}/>

                    <div className='text-xs text-muted-foreground mt-4'>
                      Add anything your students might need to complete the course
                    </div>
                    </div>
                )}
    </div>
  )
}

export default AttachmentForm