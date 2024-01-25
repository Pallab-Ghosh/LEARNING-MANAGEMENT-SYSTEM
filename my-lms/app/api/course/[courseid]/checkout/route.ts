import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import Navbar from '../../../../(dashboard)/_components/navbar';

type params_props = {
  params: {
    courseid: string
  }
}

 export async function POST(req: Request, { params }: params_props) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0].emailAddress) {
      return new NextResponse('Unauthorize', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseid,
        isPublished: true
      }
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseid
        }
      }
    });

    if (purchase) {
      return new NextResponse('Already Purchased', { status: 400 })
    }

    if (!course) {
      return new NextResponse('Not found', { status: 404 })
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: course.title,
            description: course.description!
          },
          unit_amount: course.price! * 100
        },
        quantity: 1,

      }
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id
      },
      select: {
        stripeCustomerId: true
      }
    })

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id
        }
      })
    }

    const sessions = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
     /*  billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      }, */
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}?cancel=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      }
    })

    return NextResponse.json({ url: sessions.url });
  }
  catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}








