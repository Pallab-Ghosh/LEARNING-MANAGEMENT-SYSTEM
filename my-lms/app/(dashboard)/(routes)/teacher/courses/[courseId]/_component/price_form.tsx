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
 


type PriceFormProps={
    initialData:Course
    courseId:string
}


const formSchema=z.object({
    price:z.coerce.number()
})


const PriceForm = ({initialData,courseId}:PriceFormProps) => {

const[isEditing,setEditting]=useState(false);

const router=useRouter()



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      price:initialData?.price || undefined
    }
  })

  const {isSubmitting,isValid}=form.formState



const onSubmit=async(values:z.infer<typeof formSchema>)=>{

 // console.log(values)

      try {
        await axios.patch(`/api/course/${courseId}`,values)
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
          Course Price
          <Button onClick={toggleEdit}>
            {
          isEditing ? ( <>Cancel</>):  (  <> <Pencil className='h-4 w-4 mr-2'/>Edit Price</>)
            }
            
          </Button>
        </div>
      {
        !isEditing ? (
        <p className={cn('text-sm mt-2',  !initialData.price && 'text-slate-500 italic')}> {initialData.price  || 'No Price'} </p>
        ):
        (
          <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                      <FormField
                        control={form.control}
                        name='price'
                        render={({field})=>(
                        <FormItem>
                          <FormLabel>Course Price</FormLabel>
                           <FormControl>
                            <Input disabled={isSubmitting} type='number' step='0.01' placeholder='set a price for your course'   {...field}/>
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

export default PriceForm