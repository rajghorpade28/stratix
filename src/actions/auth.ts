"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

import { registerSchema } from "@/lib/validations";

export async function registerUser(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedData = registerSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { error: validatedData.error.issues[0].message };
    }

    const { name, email, phone, password } = validatedData.data;

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

export async function resendVerificationOTP(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success silently for security
      return { success: true };
    }

    if (user.emailVerified) {
      return { error: "Email is already verified." };
    }

    const verificationToken = await generateVerificationToken(email);

    try {
      await sendVerificationEmail(
        verificationToken.identifier,
        verificationToken.token,
        user.name || "User"
      );
    } catch (emailError) {
      console.warn("Failed to resend verification email:", emailError);
    }

    return { success: true };
  } catch (error) {
    console.error("OTP resend error:", error);
    return { error: "An error occurred while resending the code." };
  }
}
