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


