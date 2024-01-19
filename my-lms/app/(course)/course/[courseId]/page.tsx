
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type CourseIdParams={
    params:{
        courseId:string
    }
}

const CourseIdPage = async({params}:CourseIdParams) => {

  const course=await db.course.findUnique({
    where:{
      id:params.courseId
    },
    include:{
      chapters:{
        where:{
          isPublished:true
        },
        orderBy:{
          position:'asc'
        }
      }
    }
  })

  if(!course)return redirect('/');

  return redirect(`/course/${course.id}/chapters/${course.chapters[0].id}`)

  return (
    <div>CourseAId {params.courseId}</div>
  )
}

export default CourseIdPage