"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { loginSchema, LoginSchema } from "@/lib/schemas/LoginSchema";
import { UserSchema } from "@/db/schema";
import { getUserByEmail } from "@/db/utils";
import { createSession, deleteSession } from "@/lib/session";

type LoginResult =
  | {
      status: "success";
      data: UserSchema;
    }
  | { status: "error"; error: string };

export async function login(data: LoginSchema): Promise<LoginResult> {
  try {
    const validated = loginSchema.safeParse(data);
    if (!validated.success) {
      return {
        status: "error",
        error: validated.error.issues.map((i) => i.message).join(", "),
      };
    }

    const { email, password } = validated.data;

    const [existingUser] = await getUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.passwordHash!,
    );

    if (!existingUser || !isPasswordMatch) {
      return { status: "error", error: "Invalid email or password" };
    }

    await createSession(existingUser.id);

    return {
      status: "success",
      data: existingUser,
    };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
