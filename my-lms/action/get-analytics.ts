import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";


type PurchaseWithCourse=Purchase & {
    course:Course
}

const groupByCourse=(purchases :PurchaseWithCourse[])=>{
    const grouped: {[courseTitle : string] : number}={}

    purchases.forEach((purchase_value)=>{
        const courseTitle=purchase_value.course.title;
        if(!grouped[courseTitle]){
            grouped[courseTitle]=0;
        }

        grouped[courseTitle]+=purchase_value.course.price!;

    })
    return grouped;

}

export const getAnalytics=async(userId:string)=>{

     try 
     {
        const purchases=await db.purchase.findMany({
            where:{
                course:{
                    userId
                }
            },
            include:{
                course:true
            }
        })

        const groupedEarnings=groupByCourse(purchases);
        
     }
      catch (error) {
        console.log("[GET_ANALYTICS]",error)
        return{
            data:[],
            totalReveneu :0,
            totalSales: 0
        }
     }
}


