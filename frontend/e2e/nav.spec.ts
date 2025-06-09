import { expect, test } from "@playwright/test";

/**
 * Teste la navigation de la navbar principale.
 * Pour chaque lien, clique dessus et vérifie que l'URL est correcte.
 */
const NAV_LINKS = [
  { label: "Docs", path: "/docs" },
  { label: "Team", path: "/team" },
  { label: "FAQ", path: "/faq" },
  { label: "Pricing", path: "/pricing" },
];

test.describe("HomeNavbar navigation", () => {
  for (const { label, path } of NAV_LINKS) {
    test(`navigates to ${label}`, async ({ page }) => {
      await page.goto("http://localhost:3000/");
      await page.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    });
  }
});
