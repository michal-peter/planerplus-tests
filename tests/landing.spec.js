const { test, expect } = require('@playwright/test');

test('landing pokazuje cennik', async ({ page }) => {
  await page.goto('https://planerplus.pl');
  await expect(page.getByText('Wybieram Plus')).toBeVisible();
});

test('Wybieram Plus otwiera rejestrację', async ({ page }) => {
  await page.goto('https://planerplus.pl');
  await page.getByText('Wybieram Plus').click();
  await expect(page).toHaveURL(/mode=register/);
  await expect(page.getByText('Nowe konto')).toBeVisible();
});