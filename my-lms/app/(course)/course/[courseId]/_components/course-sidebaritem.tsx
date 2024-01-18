 


 type CourseSidebarItemProps={
    
    id:string,
    label:string,
    isCompleted : boolean,
    courseId:string,
    islocked:boolean
 }

const CourseSidebarItem= ({id,label,isCompleted,courseId,islocked}:CourseSidebarItemProps) => {
  return (
    <div>course-sidebaritem</div>
  )
}

export default  CourseSidebarItem