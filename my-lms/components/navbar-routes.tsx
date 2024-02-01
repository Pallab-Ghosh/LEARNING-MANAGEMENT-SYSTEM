"use client"

import { UserButton, auth, useAuth } from '@clerk/nextjs'
import { usePathname,useRouter } from 'next/navigation'

import React from 'react'
import { Button } from './ui/button'
import {  LogOut } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { isTeacher } from '@/lib/teacher'

const NavbarRoutes = () => {

    const pathname=usePathname();
    const router=useRouter();

const isTeacherPage=pathname?.startsWith('/teacher');
const isPlayerPage=pathname?.startsWith('/course');
const isSeacrhPage=pathname==='/search'
const {userId}=useAuth()
const is_CurrentUser_Teacher=isTeacher(userId)

  return (
    <>
     {
       isSeacrhPage && (
        <div className=' hidden md:block'>
           <SearchInput/>
        </div>
       )
     }
    <div className='flex gap-x-2 ml-auto'>
        {
            isTeacherPage || isPlayerPage ?
            (
              <Link href='/'>
                <Button size='sm'>
                    <LogOut className='h4 w-4 mr-2' />
                    Exit
                </Button>
                 </Link>
            ):
            (
              is_CurrentUser_Teacher ?
              (
                <Link href='/teacher/courses'>
                  <Button size='sm' >
                    Teacher Mode
                  </Button>
                </Link>) : null
            )
        }
        <UserButton
        afterSignOutUrl='/'
        />
    </div>
    </>
  )
}

export default NavbarRoutes