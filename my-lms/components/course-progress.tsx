import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type CourseProgressProps={
    value:number,
    variant:"default" | "success",
    
}

const colorByVariant={
    default:"text-sky-700",
    success:"text-emerald-700"
}

 


const CourseProgress = ({value,variant}:CourseProgressProps) => {
  return (
    <div>
      <Progress
       value={value}
       className=" h-2"
        />
        <p className={cn("font-medium mt-2 text-sky-700",
         colorByVariant[variant || "default"],
        
        )}>
            {Math.round(value)}% complete
        </p>
    </div>
  )
}

export default CourseProgress