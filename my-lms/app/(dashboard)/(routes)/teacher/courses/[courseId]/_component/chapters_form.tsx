'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {Form,FormControl,FormItem,FormField,FormMessage, FormLabel, FormDescription} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Pencil, Plus, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '../../../../../../../lib/utils';
import { Textarea } from '@/components/ui/textarea'
import { Course ,Chapter} from '@prisma/client'
import ChapterList from './chapters-list'


 

type ChapterFormProps={
    initialData:Course & {chapters:Chapter[]}
    courseId:string
    
}


const formSchema=z.object({
    title:z.string().min(1)
})


const ChapterForm = ({initialData,courseId}:ChapterFormProps) => {
const [isCreating,setIsCreating]=useState(false)
const[isUpdating,setUpDating]=useState(false);

const router=useRouter()



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title : ""
    }
  })

  const {isSubmitting,isValid}=form.formState



const onSubmit=async(values:z.infer<typeof formSchema>)=>{

 // console.log(values)

      try {
       await axios.post(`/api/course/${courseId}/chapters`,values)
        toast.success('Chapter Updated')
        toggleCreating()
       
      }

        catch (error) {
           toast.error('Something went wrong')
        }
}

 
const onReorder=async(updateData:{id:string,position:number}[])=>{
   try
    {
      setUpDating(true);
      await axios.put(`/api/course/${courseId}/chapters/reorder`,{
        list:updateData
      })
      toast.success('Chapters reordered');
      window.location.reload();
   }
    catch (error) {
    toast.error('Something went wrong');
   }
   finally{
    setUpDating(false)
   }
}

const onEdit=(id:string)=>{
 router.push(`/teacher/courses/${courseId}/chapters/${id}`)
}


const toggleCreating=()=>{
  setIsCreating((current)=>!current)
}

  return (
    <div className=' relative mt-6 border bg-slate-100 rounded-md p-4'>
      {
        isUpdating && (
          <div className=' absolute h-full w-full bg-slate-500/20 top-0 right-0
           rounded-md flex items-center justify-center '
          >
            <Loader2 className='animate-spin h-6 w-6 text-sky-700' />
          </div>
        )
      }
        <div className='font-medium flex items-center justify-between'>
          Course Chapter
          <Button onClick={toggleCreating}>
            {
          isCreating? ( <>Cancel</>):  (  <> <PlusCircle className='h-4 w-4 mr-2'/>Add a Chapter</>)
            }
            
          </Button>
        </div>
      {
        isCreating &&
        (
          <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                      <FormField
                        control={form.control}
                        name='title'
                        render={({field})=>(
                        <FormItem>
                          <FormLabel>Course Chapter</FormLabel>
                           <FormControl>
                            <Input disabled={isSubmitting} placeholder="e.g. 'Introduction to the course...'"  {...field}/>
                           </FormControl>
                           <FormMessage/>
                        </FormItem>
                      )}
                      />

                       
                      <Button type='submit' disabled={!isValid || isSubmitting}> Create </Button>
                     
                   </form>
              </Form>
        )
      }

      {
        !isCreating && (
          <div className={cn(
            'text-sm mt-2',
            !initialData.chapters.length && 'text-slate-500 italic'

          )}>
            { !initialData.chapters.length && 'No Chapters'}
            <ChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
            courseId={courseId}
            
            />
          </div>
        )
      }

      {
        !isCreating && (
          <p className=' text-xs text-muted-foreground mt-4'>
            Drag and drop to reorder the Chapters
          </p>
        )
      }
      </div>
  )
}

export default ChapterForm