"use server";

import { authenticated } from "../wrappers";
import { UserRole } from "./types";

const targetUrl = "api/v1/admin/users";

export type getAllUsersResponse = {
  users: [
    {
      userId: number;
      username: string;
      fullName: string;
      email: string;
      moneyBalance: number;
      role: UserRole;
    },
  ];
};

export type User = getAllUsersResponse["users"][number];

export async function getAll() {
  return await authenticated<getAllUsersResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.users);
}
