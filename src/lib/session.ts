/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { cookies } from "next/headers";
import type { User } from "./domain";
import { getUser } from "./store";

export const SESSION_COOKIE = "demo-user";
const FALLBACK_USER_ID = "applicant-1";

/** Fake SSO: the acting user is whoever the header switcher selected. */
export async function getCurrentUser(): Promise<User> {
  const cookieStore = await cookies();
  const id = cookieStore.get(SESSION_COOKIE)?.value;
  const user = (id && getUser(id)) || getUser(FALLBACK_USER_ID);
  if (!user) throw new Error(`Seed user ${FALLBACK_USER_ID} is missing.`);
  return user;
}
