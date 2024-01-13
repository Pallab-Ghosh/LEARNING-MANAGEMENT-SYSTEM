'use client'

import { Category } from "@prisma/client"

import { type } from "os"
import {FcEditImage, FcEngineering,FcFilmReel,FcMultipleDevices,FcMusic,FcOldTimeCamera,FcSalesPerformance,FcSportsMode} from 'react-icons/fc'
import { IconType } from "react-icons/lib"
import CategoryItem from "./CategoryItem"

type categories_props={
    items:Category[],
}

const iconMap: Record<Category['name'], IconType>={
    'Music':FcMusic,
    'Photography':FcOldTimeCamera,
    'Computer Science':FcMultipleDevices,
    'Fitness':FcSportsMode,
    'Accounting':FcSalesPerformance,
    'Engineering':FcEditImage,
    'Filming':FcFilmReel
}

const Categories = ({items}:categories_props) => {
  return (
    <div className=" flex items-center gap-x-2 overflow-x-auto pb-2">
      {
        items.map((item)=>(
         <CategoryItem
         key={item.id}
         label={item.name}
         icon={iconMap[item.name]}
         value={item.id}
         />
        ))
      }
    </div>
  )
}

export default Categories