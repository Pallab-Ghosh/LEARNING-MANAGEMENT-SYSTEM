'use client'

import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";


const guestRoutes=[
  {
     icon:Layout,
     label:'Dashboard',
     href:'/'
  },
  {
    icon:Compass,
    label:'Browse',
    href:'/search'
  }
]

 const TeacherRoutes=[
  {
    icon:List,
    label:'Courses',
    href:'/teacher/courses'
  },
  {
    icon:BarChart,
    label:'Analytics',
    href:'/teacher/analytics'
  }
 ]

const SidebarRoutes = () => {

  const pathname=usePathname();

  const routes=pathname?.startsWith('/teacher') ? TeacherRoutes :guestRoutes;
  return (
    <div className='flex flex-col w-full '>
      {
        routes.map((route)=>(
          <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          />
        ))
      }
    </div>
  )
}

export default SidebarRoutes