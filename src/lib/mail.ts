import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const fromEmail = "STRATIX <noreply@stratix.agency>"; // Update with verified domain

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "STRATIX Verification Code",
    html: `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; text-align: center;">
        <h2 style="color: #1a1a1a;">Welcome to STRATIX, ${name}!</h2>
        <p style="color: #4a4a4a; font-size: 16px;">Please use the verification code below to activate your account:</p>
        <div style="margin: 30px 0;">
          <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 8px; padding: 20px; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #6366f1; display: inline-block;">
            ${token}
          </div>
        </div>
        <p style="color: #71717a; font-size: 14px;">This code will expire in 1 hour.</p>
        <p style="color: #71717a; font-size: 14px;">If you did not request this, please ignore this email.</p>
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
