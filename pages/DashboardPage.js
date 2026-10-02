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
    // #app and #auth-pin can be visible at the same time, so match only the first element
    await expect(this.app.or(this.pinScreen).first()).toBeVisible({ timeout: 20000 });
    // #auth-pin lives inside #auth, so check the login form itself rather than the container
    await expect(this.page.locator('#abtn-login')).toBeHidden();
  }
}

module.exports = { DashboardPage };
