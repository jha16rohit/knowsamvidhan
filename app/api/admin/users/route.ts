import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Role = "USER" | "ADMIN";
type Status = "ACTIVE" | "BLOCKED" | "SUSPENDED";
type UpdateUserData = {
  name?: string;
  email?: string;
  role?: Role;
  password?: string;
};


// ================= GET =================
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// ================= CREATE =================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.role || !body.password) {
      return NextResponse.json(
        { error: "Email, role, and password are required" },
        { status: 400 }
      );
    }

    if (!["USER", "ADMIN"].includes(body.role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name || "",
        email: body.email,
        password: hashedPassword,
        role: body.role as Role,
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

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error("POST ERROR:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const updateData: UpdateUserData = {
      name: body.name,
      email: body.email,
      role: body.role as Role,
    };

    if (body.password && body.password.trim() !== "") {
      updateData.password = await bcrypt.hash(body.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: body.id },
      data: updateData,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}


// ================= PATCH =================
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.id || !body.status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const validStatus: Status[] = ["ACTIVE", "BLOCKED", "SUSPENDED"];

    if (!validStatus.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: body.id },
      data: { status: body.status as Status },
      select: { id: true, status: true },
    });

    return NextResponse.json({
      message: "Status updated",
      user,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

// ================= DELETE (SOFT DELETE) =================
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    console.log("DELETE REQUEST for ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID" },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    console.log("DELETED USER:", deletedUser);

    return NextResponse.json({
      message: "User permanently deleted",
      user: deletedUser,
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    ) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}