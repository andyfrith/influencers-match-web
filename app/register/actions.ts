"use server";

import bcrypt from "bcryptjs";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { db } from "@/db";
import { users } from "@/db/schema";
import { isExistingUser } from "@/db/utils";

type RegisterResult =
  | {
      status: "success";
      data: { id: string; email: string | null; name: string | null };
    }
  | { status: "error"; error: string };

export async function registerUser(
  data: RegisterSchema,
): Promise<RegisterResult> {
  try {
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return {
        status: "error",
        error: validated.error.issues.map((i) => i.message).join(", "),
      };
    }

    const { name, email, password } = validated.data;
    if (await isExistingUser(email)) {
      return { status: "error", error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [inserted] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
      });

    if (!inserted) {
      return { status: "error", error: "Registration failed" };
    }

    return { status: "success", data: inserted };
  } catch (error) {
    console.error(error);

    // const cause =
    //   error && typeof error === "object" && "cause" in error
    //     ? (error as { cause?: { code?: string } }).cause
    //     : undefined;

    // if (cause?.code === "23505") {
    //   return { status: "error", error: "User already exists" };
    // }

    return { status: "error", error: "Registration failed" };
  }
}
