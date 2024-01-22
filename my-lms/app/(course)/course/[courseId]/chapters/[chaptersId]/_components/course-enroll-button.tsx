"use client"

import { Button } from "@/components/ui/button"
import { IndianRupee, ShoppingBag } from "lucide-react"

 type CourseEnrollButtonProps={
    price:number
    courseId:string
 }

const  CourseEnrollButton = ({price,courseId}:CourseEnrollButtonProps) => {
  return (
    <Button
    className=" w-full md:w-auto"
    size="sm"
    >
        
        <div>Enroll for {price}</div>
        <IndianRupee className="ml-1" size={18}/>
    </Button>
  )
}

export default  CourseEnrollButton