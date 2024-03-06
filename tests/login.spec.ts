import { expect, test } from "@playwright/test";

test.describe("User can", () => {
  test("login", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("admin_user");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("dash")).toBeVisible();
  });

  test("logout", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("admin_user");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByLabel("Username")).toBeVisible();
  });
});
