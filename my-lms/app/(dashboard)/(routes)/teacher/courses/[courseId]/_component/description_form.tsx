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
import { cn } from '../../../../../../../lib/utils';
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
 


type DescriptionFormProps={
    initialData:Course
    courseId:string
}


const formSchema=z.object({
    description:z.string().min(1,{message:'Description is required'})
})


const DescriptionForm = ({initialData,courseId}:DescriptionFormProps) => {

const[isEditing,setEditting]=useState(false);

const router=useRouter()



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      description:initialData.description || ""
    }
  })

  const {isSubmitting,isValid}=form.formState



const onSubmit=async(values:z.infer<typeof formSchema>)=>{

 // console.log(values)

      try {
        await axios.patch(`/api/course/${courseId}`,values)
        toast.success('Course Updated')
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
          Course Description
          <Button onClick={toggleEdit}>
            {
          isEditing ? ( <>Cancel</>):  (  <> <Pencil className='h-4 w-4 mr-2'/>Edit Description</>)
            }
            
          </Button>
        </div>
      {
        !isEditing ? (
        <p className={cn('text-sm mt-2',  !initialData.description && 'text-slate-500 italic')}> {initialData.description  || 'No description'} </p>
        ):
        (
          <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                      <FormField
                        control={form.control}
                        name='description'
                        render={({field})=>(
                        <FormItem>
                          <FormLabel>Course Description</FormLabel>
                           <FormControl>
                            <Textarea disabled={isSubmitting} placeholder="e.g. 'This course about...'"  {...field}/>
                           </FormControl>
                           <FormMessage/>
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

export default DescriptionForm