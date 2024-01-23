import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Stripe from "stripe"

type params_props={
    params:{
        courseid:string
    }
}

export async function POST(req:Request , {params}:params_props){
   try
    {
      const user=await currentUser();
      if(!user || !user.id || !user.emailAddresses?.[0].emailAddress)
      {
        return new NextResponse('Unauthorize',{status:401})
      }

      const course=await db.course.findUnique({
         where:{
            id:params.courseid,
            isPublished:true
         }
      });

      const purchase=await db.purchase.findUnique({
        where:{
            userId_courseId:{
                userId:user.id,
                courseId:params.courseid
            }
        }
      });

      if(purchase)
      {
        return new NextResponse('Already Purchased',{status:400})
      }

      if(!course)
      {
        return new NextResponse('Not found',{status:404})
      }

      const line_items:Stripe.Checkout.SessionCreateParams.LineItem[]=[
        {
            quantity:1,
            price_data:{
                currency:'INR',
                product_data:{
                    name:course.title,
                    description:course.description!
                },
                unit_amount:Math.round(course.price!*100)
            }
        }
      ];

      let stripeCustomer=await db.stripeCustomer.findUnique({
        where:{
            userId:user.id
        },
        select:{
            stripeCustomerId:true
        }
      })

      if(!stripeCustomer)
      {
        const customer=await stripe.customers.create({
          email:user.emailAddresses[0].emailAddress
        });
        
        stripeCustomer=await db.stripeCustomer.create({
          data:{
            userId:user.id,
            stripeCustomerId:customer.id
          }
        })
      }


      const sessions=await stripe.checkout.sessions.create({
        customer:stripeCustomer.stripeCustomerId,
        line_items,
        mode:'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}?sucess=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}?cancel=1`,
        metadata:{
          courseId:course.id,
          userId:user.id
        }
      })


    } 
   catch (error) {
    console.log("[COURSE_ID_CHECKOUT]",error)
    return new NextResponse('Internal Error',{status:500})
   }
}