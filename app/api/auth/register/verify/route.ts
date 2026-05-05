import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function POST(req: Request) {
  try {
    const { email, otp } = (await req.json()) as {
      email?: string;
      otp?: string;
    };

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const cleanEmail = normalizeEmail(email);
    const registration = await prisma.registrationOTP.findUnique({
      where: { email: cleanEmail },
    });

    if (!registration || registration.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    if (registration.attempts >= 5) {
      return NextResponse.json(
        { error: "Too many OTP attempts. Please request a new code." },
        { status: 429 }
      );
    }

    const isOtpValid = await bcrypt.compare(otp, registration.otpHash);

    if (!isOtpValid) {
      await prisma.registrationOTP.update({
        where: { email: cleanEmail },
        data: { attempts: { increment: 1 } },
      });

      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name: registration.name,
        email: registration.email,
        password: registration.passwordHash,
        role: "USER",
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await prisma.registrationOTP.delete({
      where: { email: cleanEmail },
    });

    return NextResponse.json({
      message: "Account verified and created successfully",
      user,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    console.error("REGISTER VERIFY ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
