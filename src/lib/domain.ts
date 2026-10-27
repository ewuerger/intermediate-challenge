/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const ROLES = [
  "admin",
  "manager",
  "reviewer",
  "approver",
  "applicant",
] as const;
export type Role = (typeof ROLES)[number];

export type DepartmentId = "etcs" | "dstw" | "lbs" | "bahnhoefe";

export type Department = {
  id: DepartmentId;
  abbreviation: string;
  label: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  /** `null` = fresh SSO login, no role assigned yet. */
  role: Role | null;
  departmentIds: DepartmentId[];
  version: number;
};
