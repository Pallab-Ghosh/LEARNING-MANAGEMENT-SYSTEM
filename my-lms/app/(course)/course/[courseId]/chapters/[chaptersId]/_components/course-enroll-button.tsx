"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { IndianRupee, ShoppingBag } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

 type CourseEnrollButtonProps={
    price:number
    courseId:string
 }

const  CourseEnrollButton = ({price,courseId}:CourseEnrollButtonProps) => {
  const[isloading,setloading]=useState(false)

  const onclick=async()=>{
     try 
     {
       setloading(true);
       const response=await axios.post(`/api/course/${courseId}/checkout`)
       window.location.assign(response.data.url);
     } 
      catch (error) {
       toast.error('Something is wrong')
     }
     finally{
      setloading(false)
     }
  }
  
  return (
    <Button
    className=" w-full md:w-auto"
    size="sm"
    onClick={onclick}
    disabled={isloading}
    >
        
        <div>Enroll for {price}</div>
        <IndianRupee className="ml-1" size={18}/>
    </Button>
  )
}

export default  CourseEnrollButton