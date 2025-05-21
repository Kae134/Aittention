//e2e test for login page with playwright

import { test } from "@playwright/test";

test("login page", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.getByPlaceholder("Password").fill("test");
  await page.getByRole("button", { name: "Login" }).click();
});
