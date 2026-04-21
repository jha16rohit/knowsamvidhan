import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "If email exists, OTP sent" });
  }

  // 🔥 generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.passwordResetOTP.create({
    data: {
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    },
  });

  // 🔥 send email
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="text-align:center;font-family:sans-serif">
        <h2>🔐 Password Reset OTP</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing:4px;">${otp}</h1>
        <p>This expires in 10 minutes</p>
      </div>
    `,
  });

  return NextResponse.json({ message: "OTP sent" });
}