
import { Button } from '@/components/ui/button'

import React from 'react'
import { IconType } from 'react-icons/lib'

type CategoryItemprops={
    key: string,
    label:string,
    icon?:IconType,
    value?:string

}

const CategoryItem = ({key,label,icon:Icon,value}:CategoryItemprops) => {

  return (
    <div>
        <Button>
            {
            Icon && <Icon size={20} />
            }
            <div className=' truncate'>
                {label}
            </div>
        </Button>
    </div>
  )
}

export default CategoryItem