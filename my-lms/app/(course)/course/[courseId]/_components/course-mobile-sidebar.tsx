import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import CourseSidebar from './course-sidebar'
import { Chapter, Course, UserProgress } from '@prisma/client'
 
type CourseMobileSidebarProps={
  course: Course & {
      chapters:(Chapter & {
          userProgress:UserProgress[] | null 
      })[]
  },
  progressCount:number
}


const  CourseMobileSidebar= ({course,progressCount}:CourseMobileSidebarProps) => {
  return (
     <Sheet>
        <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
            <Menu/>
        </SheetTrigger>

        <SheetContent side='left' className=' p-0 bg-white'>
            <CourseSidebar
             course={course}
             progressCount={progressCount}
            />
        </SheetContent>
     </Sheet>
  )
}

export default  CourseMobileSidebar