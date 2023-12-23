import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () =>{
    const {userId}=auth();
    const { sessionClaims } = auth();
    console.log('userId from clerk ',userId)
    console.log('sessionClaims',sessionClaims)
    if(!userId)
    {
      throw new Error('Unauthorized User')
    }
   
    return {userId}
}


export const ourFileRouter = {
 
  courseImage: f({ image: { maxFileSize: "4MB" }})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),

  courseAttachment:f(['text','image','audio','video','pdf'])
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),

  chapterVideo:f({video:{maxFileCount:1,maxFileSize:'512GB'}})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;