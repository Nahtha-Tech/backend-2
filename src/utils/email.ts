import { Resend } from "resend";

const resend = new Resend(Bun.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
) => {
  const resetUrl = `${Bun.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await resend.emails.send({
    from: "onboarding@resend.dev", // TODO : change this to real domain later on so it will work for other people as well
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};
