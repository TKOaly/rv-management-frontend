import { expect, test } from "@playwright/test";

test.describe("User can", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Username").fill("admin_user");
    await page.getByLabel("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("navigate to products list", async ({ page }) => {
    await page.getByRole("link", { name: "Products" }).click();
    await expect(page.getByText("Products")).toBeVisible();
  });
});
