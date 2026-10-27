/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Department, DepartmentId, Role, User } from "./domain";

export const seedDepartments: Department[] = [
  { id: "etcs", abbreviation: "ETCS", label: "ETCS" },
  { id: "dstw", abbreviation: "DSTW", label: "DSTW" },
  { id: "lbs", abbreviation: "LBS", label: "LBS" },
  { id: "bahnhoefe", abbreviation: "Bahnhöfe", label: "Bahnhöfe" },
];

function user(
  id: string,
  name: string,
  role: Role | null,
  departmentIds: DepartmentId[],
): User {
  return {
    id,
    name,
    email: `${id}@example.org`,
    role,
    departmentIds,
    version: 1,
  };
}

export const seedUsers: User[] = [
  user("admin-1", "Ada Admin", "admin", []),
  user("admin-2", "Adam Admin", "admin", []),
  user("manager-1", "Mia Manager", "manager", ["etcs", "dstw"]),
  user("manager-2", "Max Manager", "manager", ["dstw"]),
  user("manager-3", "Lea Manager", "manager", ["lbs", "bahnhoefe"]),
  user("reviewer-1", "Rita Reviewer", "reviewer", ["etcs"]),
  user("reviewer-2", "Ralf Reviewer", "reviewer", ["etcs", "lbs"]),
  user("reviewer-3", "Rosa Reviewer", "reviewer", []),
  user("approver-1", "Anton Approver", "approver", ["dstw"]),
  user("approver-2", "Alina Approver", "approver", ["bahnhoefe"]),
  user("newbie-1", "Nina Neu", null, []),
  user("applicant-1", "Hans Hersteller", "applicant", []),
];
