
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
 
import qs from 'query-string'

import React from 'react'
import { IconType } from 'react-icons/lib'

type CategoryItemprops={
    key: string,
    label:string,
    icon?:IconType,
    value?:string

}

const CategoryItem = ({key,label,icon:Icon,value}:CategoryItemprops) => {

      const pathname=usePathname()
      const router=useRouter()
      const searchParams=useSearchParams();

      const currentCategoryId=searchParams.get('categoryId');
      const currentTitle=searchParams.get('title')
      const isSelected=currentCategoryId===value
      

      const onClick=()=>{
          const url=qs.stringifyUrl({
            url:pathname,
            query:{
                title:currentTitle,
                categoryId:isSelected ? null : value
            }
          },{skipNull:true , skipEmptyString: true})

          router.push(url)
      }

  return (
    <div>
        <Button className={
            cn('py-2 px-3 text-sm border border-slate-200 first-letter rounded-full flex items-center gap-x-1 hover:border-sky-700 transition', 
             isSelected && ' border-sky-700 bg-sky-200/20 text-sky-800'
            )}
        type='button'
        variant='ghost'
        onClick={onClick}
        >
            { Icon && <Icon size={20} /> }
            <div className=' truncate'>
                {label}
            </div>
        </Button>
    </div>
  )
}

export default CategoryItem