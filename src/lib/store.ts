/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Department, User } from "./domain";
import { seedDepartments, seedUsers } from "./seed";

type Store = { departments: Department[]; users: User[] };

const globalForStore = globalThis as typeof globalThis & {
  __roleBoardStore?: Store;
};

function createStore(): Store {
  return {
    departments: structuredClone(seedDepartments),
    users: structuredClone(seedUsers),
  };
}

function store(): Store {
  globalForStore.__roleBoardStore ??= createStore();
  return globalForStore.__roleBoardStore;
}

export function getUsers(): User[] {
  return store().users;
}

export function getUser(id: string): User | undefined {
  return store().users.find((user) => user.id === id);
}

export function getDepartments(): Department[] {
  return store().departments;
}

export function resetStore(): void {
  globalForStore.__roleBoardStore = createStore();
}
