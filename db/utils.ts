import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export async function isExistingUser(email: string) {
  const existingUser = await getUserByEmail(email);
  return existingUser.length > 0;
}
export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email)).limit(1);
}
