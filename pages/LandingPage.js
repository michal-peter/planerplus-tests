const { expect } = require('@playwright/test');

class LandingPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Zaloguj', exact: true });
    this.planButtons = {
      start: page.getByText('Wybieram Start'),
      plus: page.getByText('Wybieram Plus'),
      max: page.getByText('Wybieram Max'),
    };
  }

  async goto() {
    await this.page.goto('/');
  }

  async choosePlan(plan) {
    await this.planButtons[plan].click();
  }

  async expectPricingVisible() {
    for (const button of Object.values(this.planButtons)) {
      await expect(button).toBeVisible();
    }
  }
}

module.exports = { LandingPage };
