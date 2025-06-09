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
    page.getByPlaceholder("Email").fill(testUserEmail ?? ""),
    page.getByPlaceholder("Password").fill(testUserPassword ?? ""),
    page.getByRole("button", { name: "Login" }).click(),
  ]);

  // Vérifie le status HTTP
  expect(loginResponse.status()).toBe(200);

  // Vérifie un signe visuel de connexion réussie (exemple : présence d'un bouton logout)
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("login flow with invalid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  await page.getByPlaceholder("Email").fill("wrong@example.com");
  await page.getByPlaceholder("Password").fill("wrongpassword");
  await page.getByRole("button", { name: "Login" }).click();

  // Vérifie l'apparition d'un message d'erreur (adapter le sélecteur si besoin)
  await expect(page.getByText(/invalid|erreur|incorrect/i)).toBeVisible();
});
