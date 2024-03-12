import { Page } from "@playwright/test";

export const login = async (
  page: Page,
  username: string = "admin_user",
  password: string = "admin123",
) => {
  await page.goto("/");
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Username").press("Tab");
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL("/admin");
};
