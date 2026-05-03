import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const cleanEmail = normalizeEmail(email);

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    const [passwordHash, otpHash] = await Promise.all([
      bcrypt.hash(password, 10),
      bcrypt.hash(otp, 10),
    ]);

    await prisma.registrationOTP.upsert({
      where: { email: cleanEmail },
      create: {
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        otpHash,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      update: {
        name: name.trim(),
        passwordHash,
        otpHash,
        attempts: 0,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendEmail({
      to: cleanEmail,
      subject: "Verify your KnowSamvidhan account",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>Verify your email</h2>
          <p>Your KnowSamvidhan verification code is:</p>
          <h1 style="letter-spacing:4px">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Verification OTP sent to your email",
      requiresOtp: true,
      ...(process.env.NODE_ENV !== "production" ? { devOtp: otp } : {}),
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
