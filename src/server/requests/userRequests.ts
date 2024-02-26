"use server";

import { authenticated } from "../wrappers";

const targetUrl = "api/v1/admin/users";

enum UserRole {
  ADMIN = "ADMIN",
  USER1 = "USER1",
  USER2 = "USER2",
}

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

export async function getAll() {
  return await authenticated<getAllUsersResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.users);
}
