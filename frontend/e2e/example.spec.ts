import { expect, test } from "@playwright/test";

test("a un titre", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Vérifie qu'un titre "contient" une sous-chaîne.
  await expect(page).toHaveTitle(/Playwright/);
});

test("lien pour commencer", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Clique sur le lien pour commencer.
  await page.getByRole("link", { name: "Get started" }).click();

  // Vérifie que la page a un en-tête avec le nom Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
