'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {Form,FormControl,FormItem,FormField,FormMessage} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



type title_form_props={
    initialData:{
     title:string
    },
    courseId:string
}

const TitleForm = ({initialData,courseId}:title_form_props) => {
  return (
    <div>title_form</div>
  )
}

export default TitleForm