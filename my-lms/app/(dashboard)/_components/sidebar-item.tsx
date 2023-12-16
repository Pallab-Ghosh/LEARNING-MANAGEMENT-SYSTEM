'use client'
import { type } from 'os' 
import {usePathname,useRouter} from 'next/navigation'
import { cn } from '@/lib/utils'
import {LucideIcon} from 'lucide-react'

type SidebarItemProps ={
  icon:LucideIcon,
  label:string,
  href:string
}


const SidebarItem = ({icon:Icon,label,href}:SidebarItemProps) => {
const pathname=usePathname()
const router=useRouter()

const isActive=(pathname==='/' && href==='/') || (pathname ===href) || (pathname?.startsWith(`${href}/`))

const onClick=()=>{
    router.push(href);
}
  return (
    <button
    onClick={onClick}
    type='button'
    className={cn(
        'flex items-center gap-x-2 text-slate-500   text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
        isActive && 'text-sky-700 bg-sky-200/20   hover:bg-sky-200/20 hover:text-sky-700  border-r-4 border-indigo-500'
       
    )}
    >
   <div className='flex items-center gap-x-2 py-4 '> 
    <Icon size={22} className={cn('text-slate-500',isActive && 'text-sky-700' )} />
    {label}
    </div>
     
    </button>
  )
}

export default SidebarItem