/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useTransition } from "react";
import { resetData, switchUser } from "@/app/actions/session";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/lib/domain";

type UserSwitcherProps = {
  users: User[];
  currentUserId: string;
};

export function UserSwitcher({ users, currentUserId }: UserSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const items = users.map((user) => ({
    value: user.id,
    label: `${user.name} — ${user.role ?? "no role"}`,
  }));

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Acting as</span>
      <Select
        items={items}
        value={currentUserId}
        onValueChange={(value) => {
          if (typeof value !== "string") return;
          startTransition(() => switchUser(value));
        }}
        disabled={isPending}
      >
        <SelectTrigger className="w-64" aria-label="Acting user">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => startTransition(() => resetData())}
      >
        Reset data
      </Button>
    </div>
  );
}
