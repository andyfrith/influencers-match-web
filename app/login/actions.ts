"use server";

import { redirect } from "next/navigation";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
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
    const [existingUser] = await getUserByEmail(data.email);

    if (!existingUser) {
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
