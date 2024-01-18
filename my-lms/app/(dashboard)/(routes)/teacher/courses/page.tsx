import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

import { DataTable } from './_components/data-table'
import { Course } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { columns } from './_components/column'



const Coursepage = async() => {

  const {userId} = auth();

  if(!userId)
  return redirect('/');

  const courses=await db.course.findMany({
    where:{
       userId
    },
    orderBy:{
      createdAt:'asc'
    }
  })


  return (
    <div className='p-6'>
       <DataTable columns={columns} data={courses} />
     </div>
  )
}

export default Coursepage