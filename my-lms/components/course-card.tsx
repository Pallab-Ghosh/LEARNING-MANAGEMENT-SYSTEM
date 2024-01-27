import Image from "next/image"
import Link from "next/link"
import { IconBadge } from "./icon-badge"
import { BookOpen, IndianRupee } from "lucide-react"
import CourseProgress from "./course-progress"

type CourseCardProps={
    id:string,
    title:string,
    imageUrl:string,
    chaptersLength:number,
    price:number,
    progress:number | null,
    category?:string
}

const CourseCard = ({id,title,imageUrl,chaptersLength,price,progress,category}:CourseCardProps) => {
  return (
    <Link href={`/course/${id}`}>
 
           <div className=" group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className=" relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                     fill
                     className=" object-cover"
                     alt={title}
                     src={imageUrl}
                    />
                    
                </div>
 
                   <div className=" flex flex-col pt-2">
                            <div className=" text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 ">
                                {title}
                            </div>

                            <p className=" text-xs total-muted-foreground">
                               {category}
                            </p>

                        <div className=" my-3 flex items-center gap-x-2 text-sm md:text-xs">

                             <div className=" flex items-center gap-x-1 text-slate-500">
                                   <IconBadge size='sm' icon={BookOpen}/>
                                    <span className=' text-blue-500'>
                                    {chaptersLength} {chaptersLength===1 ? ' Chapter' : ' Chapters'}
                                    </span>
                             </div>
                        </div>
                         {
                            progress!==null ?(
                                <div>
                                     <CourseProgress
                                      value={progress}
                                      variant={progress ===100 ? "success" :'default'}
                                     />
                                </div>
                            ):(
                                <p className=" text-md md:text-sm font-medium flex">
                                      <IndianRupee size={17}/> {price}
                                </p>
                            )
                         }

                   </div>


            </div>
          
    </Link>
  )
}

export default CourseCard