"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function submitWebsiteRequest(data: any) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    await prisma.websiteRequest.create({
      data: {
        userId: userId || null,
        data: JSON.stringify(data),
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
