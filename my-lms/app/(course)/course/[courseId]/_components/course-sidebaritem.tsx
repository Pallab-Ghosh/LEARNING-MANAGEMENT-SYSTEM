'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle, Lock, PlayCircle } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

 


 type CourseSidebarItemProps={
    
    id:string,
    label:string,
    isCompleted : boolean,
    courseId:string,
    islocked:boolean
 }

const CourseSidebarItem= ({id,label,isCompleted,courseId,islocked}:CourseSidebarItemProps) => {

    const pathname=usePathname()
    const router=useRouter();

    const Icon=islocked ? Lock : (isCompleted ? CheckCircle :PlayCircle )
   
    const isActive=pathname.includes(id);

    const onClick=()=>{
        router.push(`/course/${courseId}/chapters/${id}`)
    }
    return (
    <button type="button" 
      onClick={onClick}

    className={cn('flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
    isActive && 'text-slate-700 bg-lime-200 hover:bg-emerald-100 hover:text-slate-700',
    isCompleted && ' text-emerald-700 hover:text-emerald-700',
    isCompleted && isActive && 'bg-slate-200/20'
    )}
    >
        <div className="flex items-center gap-x-2 my-4">
              <Icon size={22}
              className={cn('text-slate-500',
              isActive && 'text-slate-700',
              isCompleted && ' text-emerald-700'
              )}
              />
              {label}
        </div>
        <div
        className={cn(
            "ml-auto opacity-0 border-2  border-orange-800 h-full transition-all",
            isActive && 'opacity-100',
            isCompleted && 'border-emerald-700'
        )}
        />

         
        
    </button>
  )
}

export default  CourseSidebarItem