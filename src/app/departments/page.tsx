/*
 * Copyright DB InfraGO AG and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDepartments, getUsers } from "@/lib/store";

export default function DepartmentsPage() {
  const departments = getDepartments();
  const users = getUsers();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Departments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Abbreviation</TableHead>
            <TableHead>Label</TableHead>
            <TableHead className="text-right">Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.id}>
              <TableCell>{department.abbreviation}</TableCell>
              <TableCell>{department.label}</TableCell>
              <TableCell className="text-right">
                {
                  users.filter((user) =>
                    user.departmentIds.includes(department.id),
                  ).length
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
