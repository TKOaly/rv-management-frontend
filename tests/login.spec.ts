import { expect, test } from "@playwright/test";
import { login } from "./fixtures/login";

test("User can login", async ({ page }) => {
  await login(page);
  await expect(page.getByText("dash")).toBeVisible();
});

test("User can logout", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByPlaceholder("Enter username...")).toBeVisible();
});
