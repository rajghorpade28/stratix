"use server";

import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function requestPasswordReset(email: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!existingUser) {
      // Return success even if user doesn't exist for security reasons (don't leak emails)
      return { success: true };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    try {
      await sendPasswordResetEmail(
        passwordResetToken.identifier,
        passwordResetToken.token
      );
    } catch (emailError) {
      console.warn("Failed to send reset email:", emailError);
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
}
