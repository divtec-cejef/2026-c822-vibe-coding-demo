// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Brasseries de Suisse', () => {
  test('affiche au moins une pin Leaflet au chargement', async ({ page }) => {
    await page.goto('/');

    // Attend que les markers Leaflet soient injectes dans le DOM apres le fetch Overpass.
    const firstMarker = page.locator('.leaflet-marker-icon').first();
    await expect(firstMarker).toBeVisible({ timeout: 30_000 });

    const count = await page.locator('.leaflet-marker-icon').count();
    expect(count).toBeGreaterThan(0);
  });

  test('le filtre de recherche met a jour le compteur du footer', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('.app-footer');
    await expect(footer).toContainText(/affichée/i, { timeout: 30_000 });

    await page.locator('#search').fill('lorraine');

    await expect(footer).toContainText(/1\s+brasserie\s+affichée\s+sur/i, { timeout: 5_000 });
  });
});
