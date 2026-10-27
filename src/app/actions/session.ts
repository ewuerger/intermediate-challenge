/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session";
import { resetStore } from "@/lib/store";

export async function switchUser(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, userId, { path: "/", sameSite: "lax" });
  revalidatePath("/", "layout");
}

export async function resetData(): Promise<void> {
  resetStore();
  revalidatePath("/", "layout");
}
