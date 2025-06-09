// Test e2e pour la page de connexion avec playwright

import { expect, test } from "@playwright/test";

const testUserPassword = process.env.NEXT_TEST_USER_PASSWORD;
const testUserEmail = process.env.NEXT_TEST_USER_EMAIL;

test("login flow", async ({ page }) => {
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

  // Vérifie un signe visuel de connexion réussie (exemple : présence d’un bouton logout)
  //await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
