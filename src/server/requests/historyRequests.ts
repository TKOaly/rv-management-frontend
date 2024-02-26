"use server";

import { authenticated } from "../wrappers";
import { UserRole } from "./types";

const depositsUrl = "api/v1/admin/depositHistory";

export type getAllDepositsResponse = {
  deposits: [
    {
      depositId: number;
      time: string;
      amount: number;
      balanceAfter: number;
      user: {
        userId: number;
        username: string;
        fullName: string;
        email: string;
        moneyBalance: number;
        role: UserRole;
      };
    },
  ];
};

export type Deposit = getAllDepositsResponse["deposits"][number];

export async function getAllDeposits() {
  return await authenticated<getAllDepositsResponse>(
    `${process.env.RV_BACKEND_URL}/${depositsUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.deposits);
}
