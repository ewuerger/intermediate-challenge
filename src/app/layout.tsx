/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { UserSwitcher } from "@/components/user-switcher";
import { getCurrentUser } from "@/lib/session";
import { getUsers } from "@/lib/store";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Role Board",
  description: "Manage roles and departments of users.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser();
  const users = getUsers();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="flex items-center gap-6 border-b px-6 py-3">
          <span className="font-semibold">Role Board</span>
          <nav className="flex gap-4 text-sm">
            <Link href="/">Users</Link>
            <Link href="/departments">Departments</Link>
          </nav>
          <div className="ml-auto">
            <UserSwitcher users={users} currentUserId={currentUser.id} />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
