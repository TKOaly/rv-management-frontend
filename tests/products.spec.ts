import { expect, test } from "@playwright/test";
import { login } from "./fixtures/login";
import { getRandomBarcode } from "./utils/random";

test.beforeEach(async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: "Products" }).click();
});

test("User can list products", async ({ page }) => {
  await expect(page.getByText("Karjala")).toBeVisible();
});

test("User can add a product", async ({ page }) => {
  const randomBarcode = await getRandomBarcode();

  await page.getByRole("link", { name: "New Product" }).click();
  await page.getByPlaceholder("Barcode").fill(randomBarcode);
  await page.getByPlaceholder("Barcode").press("Enter");
  await page.getByPlaceholder("Name").fill("Testipavut");
  await page.getByText("Select a category").click();
  await page.getByLabel("Food, other (meat pies etc.)").click();
  await page.getByRole("button", { name: "Create Product" }).click();

  await page.waitForURL(`/admin/products/${randomBarcode}`);

  await expect(
    page.locator("h1").filter({ hasText: "Testipavut" }),
  ).toBeVisible();
  await expect(page.locator("#category")).toHaveText(
    "Food, other (meat pies etc.)",
  );
  await expect(page.getByLabel("Barcode")).toHaveText(randomBarcode);
});

test("User can edit a product", async ({ page }) => {
  await page.getByRole("link", { name: "Daim 2-pack" }).click();
  await page.getByRole("link", { name: "Edit", exact: true }).click();
  await page.locator("#name").click();
  await page.locator("#name").fill("Daim 6-pack");
  await page.locator("#categoryId").click();
  await page.getByLabel("Sweets, chocolate").click();
  await page.getByPlaceholder("Sell Price").click();
  await page.getByPlaceholder("Sell Price").fill("3");
  await page.getByRole("button", { name: "Update Product" }).click();

  await expect(
    page.locator("h1").filter({ hasText: "Daim 6-pack" }),
  ).toBeVisible();
  await expect(page.getByText("Sweets, chocolate")).toBeVisible();
  await expect(
    page.locator("h3").filter({ hasText: "Daim 6-pack" }),
  ).toBeVisible();
});
