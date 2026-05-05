import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NextResponse } from "next/server";
import crypto from "crypto";

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
      return NextResponse.json({ message: "If email exists, link sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;
    const resetLink = `${appUrl}/reset-password?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: "Reset your KnowSamvidhan password",
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return NextResponse.json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send reset link" },
      { status: 500 }
    );
  }
}
