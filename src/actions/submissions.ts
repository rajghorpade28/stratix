"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

import { calculateInternalQuotation } from "./calculateQuotation";

export async function submitWebsiteRequest(data: any) {
  try {
    const session = await auth();
    let userId = session?.user?.id;

    if (!userId && data.businessInfo?.email) {
      const email = data.businessInfo.email;
      let existingUser = await prisma.user.findUnique({ where: { email } });
      
      if (existingUser) {
        userId = existingUser.id;
      } else {
        existingUser = await prisma.user.create({
          data: {
            email,
            name: data.businessInfo.name || "Client",
            phone: data.businessInfo.phone || null,
          }
        });
        userId = existingUser.id;
      }
    }

    // Calculate internal quotation before saving
    const breakdown = calculateInternalQuotation(data);

    await prisma.websiteRequest.create({
      data: {
        userId: userId || null,
        data: JSON.stringify(data),
        calculatedQuote: breakdown.finalQuote,
        calculatedTimeline: breakdown.finalMaxDays,
        quoteBreakdown: JSON.stringify(breakdown),
        calculationVersion: 1.0,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit website request:", error);
    return { error: "Submission failed" };
  }
}

export async function submitAppRequest(data: any) {
  try {
    const session = await auth();
    let userId = session?.user?.id;

    if (!userId && data.businessInfo?.email) {
      const email = data.businessInfo.email;
      let existingUser = await prisma.user.findUnique({ where: { email } });
      
      if (existingUser) {
        userId = existingUser.id;
      } else {
        existingUser = await prisma.user.create({
          data: {
            email,
            name: data.businessInfo.name || "Client",
            phone: data.businessInfo.phone || null,
          }
        });
        userId = existingUser.id;
      }
    }

    await prisma.appRequest.create({
      data: {
        userId: userId || null,
        data: JSON.stringify(data),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit app request:", error);
    return { error: "Submission failed" };
  }
}
