import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, otp, newPassword } = await req.json();

  const record = await prisma.passwordResetOTP.findFirst({
    where: { email, otp },
    orderBy: { expiresAt: "desc" },
  });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  // 🔐 hash password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  // delete OTP
  await prisma.passwordResetOTP.deleteMany({
    where: { email },
  });

  return NextResponse.json({ message: "Password reset successful" });
}