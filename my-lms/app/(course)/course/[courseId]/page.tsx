
import React from 'react'

type CourseIdParams={
    params:{
        courseId:string
    }
}

const CourseIdPage = ({params}:CourseIdParams) => {
  return (
    <div>CourseAId {params.courseId}</div>
  )
}

export default CourseIdPage