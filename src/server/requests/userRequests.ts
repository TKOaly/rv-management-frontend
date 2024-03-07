"use server";

import { authenticated } from "../wrappers";
import { QueryKeys } from "./queryKeys";
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

export async function getAllUsers() {
  return await authenticated<getAllUsersResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.users);
}

export async function getUser(userId: string) {
  return await authenticated<{ user: User }>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}/${userId}`,
    {
      method: "GET",
      next: {
        tags: [QueryKeys.users],
      },
    },
  ).then((data) => data.user);
}
