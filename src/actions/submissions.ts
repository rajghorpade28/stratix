"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

import { calculateInternalQuotation } from "./calculateQuotation";

export async function submitWebsiteRequest(data: any) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

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
    const userId = session?.user?.id;

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
