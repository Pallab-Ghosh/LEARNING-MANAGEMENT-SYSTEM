'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {Form,FormControl,FormItem,FormField,FormMessage, FormLabel, FormDescription} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { File, ImageIcon, Loader, Loader2, Pencil, PlusCircle, X } from 'lucide-react'
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
const[deletingId,setdeletingId]=useState<string | null>(null);
const router=useRouter()


const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       //alert(values.imageUrl)
      try {
       const fetchdata= await axios.post(`/api/course/${courseId}/attachments`,values)
      // console.log(fetchdata.data)
        toast.success('Course Updated')
        toggleEdit();
        window.location.reload();
      }
        catch (error) {
           toast.error('Something went wrong')
        }
}


//delete the attachments

const onDelete=async(id:string)=>{
   try
    {
    setdeletingId(id);
    console.log('deletingId',deletingId)
    await axios.delete(`/api/course/${courseId}/attachments/${id}`);
    toast.success('Attachment deleted');
    window.location.reload();
    } 
   catch (error) {
     toast.error('Something went wrong')
   }
   finally{
    setdeletingId(null)
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

                {
                   initialData.attachments.length > 0 && (
                    <div className='space-y-2'>
                      {
                        initialData.attachments.map((attachment_file)=>(
                          <div key={attachment_file.id} className=' flex items-center p-3 w-full bg-sky-100 border-sky-200 text-sky-700 rounded-md'>
                             <File className='h-4 w-4 mr-2 flex-shrink-0'/>
                             <p className='text-xs line-clamp-1'>
                              {attachment_file.name}
                              </p>
                               
                               {
                                deletingId===attachment_file.id && (
                                  <div>
                                      <Loader2 className='h-5 w-5 animate-spin'/>
                                  </div>
                                )
                               }

                               {
                                 deletingId!==attachment_file.id  && (
                                  <Button variant='destructive' className='ml-auto hover:opacity-75 transition' onClick={()=>onDelete(attachment_file.id)}>
                                      <X className='h-4 w-4 '/>
                                  </Button>
                               )}
                          </div>
                        ))
                      }

                    </div>
                   )
                }
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