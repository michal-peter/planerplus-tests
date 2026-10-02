const { expect } = require('@playwright/test');

/** Screen shown after a successful login (or the PIN prompt if the account uses one). */
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.app = page.locator('#app');
    this.pinScreen = page.locator('#auth-pin');
    this.userEmail = page.locator('#user-email');
  }

  /** Credentials accepted: either the app shell or the encryption PIN prompt is shown. */
  async expectAuthenticated() {
    await expect(this.app.or(this.pinScreen)).toBeVisible({ timeout: 20000 });
    await expect(this.page.locator('#auth')).toBeHidden();
  }
}

module.exports = { DashboardPage };
