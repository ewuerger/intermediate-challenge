/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Role } from "@/lib/domain";
import { getDepartments, getUsers } from "@/lib/store";

const DEPARTMENT_ROLES: Role[] = ["manager", "reviewer", "approver"];

export default function UsersPage() {
  const users = getUsers();
  const departments = getDepartments();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Departments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const missingDepartment =
              user.role !== null &&
              DEPARTMENT_ROLES.includes(user.role) &&
              user.departmentIds.length === 0;
            return (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role ? (
                    <Badge variant="secondary">{user.role}</Badge>
                  ) : (
                    <span className="text-muted-foreground">no role</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {departments
                      .filter((department) =>
                        user.departmentIds.includes(department.id),
                      )
                      .map((department) => (
                        <Badge key={department.id} variant="outline">
                          {department.abbreviation}
                        </Badge>
                      ))}
                    {missingDepartment ? (
                      <Badge variant="destructive">No department</Badge>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
