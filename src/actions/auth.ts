"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      return { error: "Please fill in all required fields." };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match." };
    }

    if (password.length < 8) {
      return { error: "Password must be at least 8 characters long." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    
    // In local dev without API keys, this might throw if RESEND_API_KEY is missing.
    // Wrap in try-catch so registration doesn't completely fail for dev environment.
    try {
      await sendVerificationEmail(
        verificationToken.identifier,
        verificationToken.token,
        name
      );
    } catch (emailError) {
      console.warn("Failed to send verification email (API Key missing?):", emailError);
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred during registration. Please try again." };
  }
}

export async function verifyEmailOTP(email: string, code: string) {
  try {
    const existingToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: code,
      },
    });

    if (!existingToken) {
      return { error: "Invalid verification code." };
    }

    if (new Date(existingToken.expires) < new Date()) {
      return { error: "Verification code has expired. Please register again or request a new code." };
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: code,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("OTP verification error:", error);
    return { error: "An error occurred during verification." };
  }
}
