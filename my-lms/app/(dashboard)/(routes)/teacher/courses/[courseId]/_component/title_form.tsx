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
 


type title_form_props={
    initialData:{
     title:string
    },
    courseId:string
}


const formSchema=z.object({
  title:z.string().min(1,{message:'Title is required'})
})


const TitleForm = ({initialData,courseId}:title_form_props) => {

const[isEditing,setEditting]=useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:initialData
  })


const {isSubmitting,isValid}=form.formState
const router=useRouter()

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
          Course Title
          <Button onClick={toggleEdit}>
            {
          isEditing ? ( <>Cancel</>):  (  <> <Pencil className='h-4 w-4 mr-2'/>Edit Title</>)
            }
            
          </Button>
        </div>
      {
        !isEditing ? (
          <p className='text-sm mt-2'> {initialData.title} </p>
        ):
        (
          <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                      <FormField
                        control={form.control}
                        name='title'
                        render={({field})=>(
                        <FormItem>
                          <FormLabel>Course Title</FormLabel>
                           <FormControl>
                            <Input disabled={isSubmitting} placeholder="e.g. 'Advanced Web Development'"  {...field}/>
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

export default TitleForm