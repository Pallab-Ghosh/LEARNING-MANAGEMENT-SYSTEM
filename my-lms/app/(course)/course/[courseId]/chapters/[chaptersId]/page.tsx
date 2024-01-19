import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


type ChaptersPlayepageProps={
    params:{
        chaptersId:string,
        courseId:string
    }
}

const ChaptersPlayepage = async({params}:ChaptersPlayepageProps)=> {
 
 const {userId}=auth();

 if(!userId)return redirect('/');

   


  return (
    <div>Chapter player page with chapterId {params.chaptersId}</div>
  )
}

export default ChaptersPlayepage