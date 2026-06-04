"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { emailValidation, passwordValidation } from "@/lib/validations";

export async function requestPasswordReset(email: string) {
  try {
    const validatedEmail = emailValidation.safeParse(email);
    if (!validatedEmail.success) {
      return { error: "Please enter a valid email address." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedEmail.data }
    });

    if (!existingUser) {
      return { success: true };
    }

    const passwordResetToken = await generatePasswordResetToken(validatedEmail.data);

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
    const validatedPassword = passwordValidation.safeParse(newPassword);
    if (!validatedPassword.success) {
      return { error: validatedPassword.error.errors[0].message };
    }

    const existingToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!existingToken) {
      return { error: "Invalid or expired reset token." };
    }

    if (new Date(existingToken.expires) < new Date()) {
      return { error: "Reset link has expired. Please request a new one." };
    }

    const passwordHash = await bcrypt.hash(validatedPassword.data, 12);

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
