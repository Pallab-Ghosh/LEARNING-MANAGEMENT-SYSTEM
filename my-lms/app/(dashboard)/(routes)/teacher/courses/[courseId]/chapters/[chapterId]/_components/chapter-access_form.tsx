'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {Form,FormControl,FormItem,FormField,FormMessage, FormLabel, FormDescription} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
 
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course } from '@prisma/client'
import { Editor } from '@/components/editor'
import { cn } from '@/lib/utils'
import { Preview } from '@/components/preview'
 
import { Checkbox } from '@/components/ui/checkbox'

type ChapterAccessFormProps={
    initialData:Chapter
    courseId:string,
    chapterId:string
}


const formSchema=z.object({
    isFree:z.boolean().default(false)
})


const ChapterAccessForm = ({initialData,chapterId,courseId}:ChapterAccessFormProps) => {

const[isEditing,setEditting]=useState(false);

const router=useRouter()



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      isFree:!!initialData.isFree
    }
  })

  const {isSubmitting,isValid}=form.formState



const onSubmit=async(values:z.infer<typeof formSchema>)=>{

 // console.log(values)

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
          Chapter Access 
          <Button onClick={toggleEdit}>
            {
          isEditing ? ( <>Cancel</>):  (  <> <Pencil className='h-4 w-4 mr-2'/>Edit Access</>)
            }
            
          </Button>
        </div>
      {
        !isEditing ? (
        <div className={cn('text-sm mt-2',  !initialData.isFree && 'text-slate-500 italic')}> 
          {
          initialData.isFree ?(<>This Chapter is Free for preview</>):
          (<>This Chapter is Not Free</>)
          
          }
         

        </div>
        ):
        (
          <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                      <FormField
                        control={form.control}
                        name='isFree'
                        render={({field})=>(
                        <FormItem className=' flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                          
                           <FormControl>
                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                           </FormControl>
                            <div className=' space-y-1 leading-none'>
                               <FormDescription>
                                 Check this Box if you want to make this chapter free for preview
                               </FormDescription>
                            </div>
                        </FormItem>
                      )}
                      />

                      <div className='flex items-center gap-x-2'>
                      <Button type='submit' disabled={!isValid || isSubmitting}> Save </Button>
                      </div>
                   </form>
              </Form>
        )
      }
      </div>
  )
}

export default  ChapterAccessForm