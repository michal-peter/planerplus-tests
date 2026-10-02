const { test, expect } = require('@playwright/test');
const { LandingPage } = require('../pages/LandingPage');

test.describe('Landing page', () => {
  test('shows pricing plans', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.goto();
    await landing.expectPricingVisible();
  });

  test('"Wybieram Plus" opens registration with the plan preselected', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.goto();
    await landing.choosePlan('plus');
    await expect(page).toHaveURL(/mode=register/);
    await expect(page).toHaveURL(/plan=plus/);
    await expect(page.getByText('Nowe konto')).toBeVisible();
  });

  test('login link leads to the login screen', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.goto();
    await landing.loginLink.first().click();
    await expect(page).toHaveURL(/\/app$/);
    await expect(page.getByText('Zaloguj się').first()).toBeVisible();
  });
});
