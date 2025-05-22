// Test e2e pour la page de connexion avec playwright

import { test } from "@playwright/test";

test("page de connexion", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.getByPlaceholder("Password").fill("test");
  await page.getByRole("button", { name: "Login" }).click();
});
