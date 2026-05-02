import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ message: "If email exists, OTP sent" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.passwordResetOTP.create({
      data: {
        email: user.email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendEmail({
      to: user.email,
      subject: "Your KnowSamvidhan OTP",
      html: `
        <div style="text-align:center;font-family:sans-serif">
          <h2>Password Reset OTP</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:4px;">${otp}</h1>
          <p>This expires in 10 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "OTP sent",
      ...(process.env.NODE_ENV !== "production" ? { devOtp: otp } : {}),
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
