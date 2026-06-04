"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
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

export async function resetPassword(token: string, newPassword: string) {
  try {
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!existingToken) {
      return { error: "Invalid or expired reset token." };
    }

    if (new Date(existingToken.expires) < new Date()) {
      return { error: "Reset link has expired. Please request a new one." };
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email: existingToken.identifier },
      data: { passwordHash }
    });

    await prisma.verificationToken.delete({
      where: { token }
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred while resetting your password." };
  }
}
