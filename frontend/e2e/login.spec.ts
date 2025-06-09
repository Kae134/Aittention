// Test e2e pour la page de connexion avec playwright

import { expect, test } from "@playwright/test";

const testUserPassword = process.env.NEXT_TEST_USER_PASSWORD;
const testUserEmail = process.env.NEXT_TEST_USER_EMAIL;

test.skip("login flow", async ({ page }) => {
  // Intercepte la requête login
  const [loginResponse] = await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/auth/login") && resp.request().method() === "POST"
    ),
    // Actions UI
    page.goto("http://localhost:3000/sign-in"),
    page.getByPlaceholder("example@email.com").fill(testUserEmail ?? ""),
    page.getByPlaceholder("••••••••").fill(testUserPassword ?? ""),
    page.getByRole("button", { name: "Sign in" }).click(),
  ]);

  // Vérifie le status HTTP
  expect(loginResponse.status()).toBe(200);

  // Vérifie un signe visuel de connexion réussie (exemple : présence d'un bouton logout)
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test.skip("login flow with invalid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  await expect(page.getByPlaceholder("example@email.com")).toBeVisible();
  await expect(page.getByPlaceholder("••••••••")).toBeVisible();
  await page.getByPlaceholder("example@email.com").fill("wrong@example.com");
  await page.getByPlaceholder("••••••••").fill("wrongpassword");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Vérifie l'apparition d'un message d'erreur (adapter le sélecteur si besoin)
  await expect(page.getByText(/invalid|erreur|incorrect/i)).toBeVisible();
});
