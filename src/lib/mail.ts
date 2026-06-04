import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const fromEmail = "STRATIX <noreply@stratix.agency>"; // Update with verified domain

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmLink = `${domain}/api/auth/verify?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Welcome to STRATIX! Please verify your email.",
    html: `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
        <h2>Welcome to STRATIX, ${name}!</h2>
        <p>Thank you for creating an account with us. We're excited to help you scale your brand.</p>
        <p>Please click the button below to verify your email address and activate your account:</p>
        <div style="margin: 30px 0;">
          <a href="${confirmLink}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
        </div>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Reset your STRATIX password",
    html: `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to choose a new one:</p>
        <div style="margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  });
};
