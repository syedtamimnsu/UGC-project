// import { verifyWebhook } from '@clerk/express/webhooks';
import * as Sentry from "@sentry/node";
import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { prisma } from '../configs/prisma';


const clerkWebhook = async (req: Request, res: Response) => {
    try {
        // const evt: any = await verifyWebhook(req)


        // Replace with this:
        
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!);
        const evt = wh.verify(req.body, {
            "svix-id": req.headers["svix-id"] as string,
            "svix-timestamp": req.headers["svix-timestamp"] as string,
            "svix-signature": req.headers["svix-signature"] as string,
        }) as any;

        // Getting Data from request
        const { data, type} = evt;

        // Switch cases for different Events
        switch(type) {
            case "user.created": {
                await prisma.user.create({
                    data: {
                        id: data.id,
                        email: data?.email_addresses[0]?.email_address,
                        name: data?.first_name + " " + data?.last_name,
                        image: data?.image_url,
                    }
                })
                break;
            }

            case "user.update": {
                await prisma.user.update({
                    where:{
                        id: data.id,
                    },
                    data: {
                        email: data?.email_addresses[0]?.email_address,
                        name: data?.first_name + " " + data?.last_name,
                        image: data?.image_url,
                    }
                })
                break;
            }

            case "user.deleted": {
                await prisma.user.delete({
                    where:{ id: data.id,},
                })
                break;
            }

            // case "paymentAttempt.updated": {
            //     console.log("Payment event received:", JSON.stringify(data, null, 2))
            //     if((data.charge_type === "recurring" || data.charge_type === "checkout") && data.status ==="paid"){
            //         const credits = {pro: 80, premium: 240,}
            //         const clerkUserId = data?.payer?.user_id;
            //         const planId: keyof typeof credits = data?.subscription_items?.[0]?.plan?.slug;

            //         if(planId !== "pro" && planId !== "premium"){
            //             return res.status(400).json({message: "Invalid Plan"})
            //         }

            //         console.log(planId)

            //         await prisma.user.update({
            //             where: {id: clerkUserId,},
            //             data: {
            //                 credits: {increment: credits[planId]},
            //             }

            //         })
            //     }
            //     break;
            // }

            case "subscription.updated": {
                    if (data.status === "active") {
                        const clerkUserId = data?.payer?.user_id;
                        
                        // Find the active item
                        const activeItem = data?.items?.find((item: any) => 
                            item.status === "active" || item.status === "upcoming"
                        );
                        const planSlug = activeItem?.plan?.slug;
                        
                        console.log("planSlug:", planSlug, "userId:", clerkUserId)
                        
                        const credits: Record<string, number> = { pro: 80, premium: 240 }
                        
                        if (clerkUserId && credits[planSlug]) {
                            await prisma.user.update({
                                where: { id: clerkUserId },
                                data: { credits: { increment: credits[planSlug] } }
                            })
                        }
                    }
                    break;
                }
                
            
            default:
                break;
        }

        res.json({message: "Webhook Received : " + type})
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({message: error.message})

    }
}


export default clerkWebhook;