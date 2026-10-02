const { expect } = require('@playwright/test');

/** Auth screen of the app (/app). Also hosts the registration form (?mode=register). */
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('#aemail');
    this.password = page.locator('#apass');
    this.passwordRepeat = page.locator('#apass2');
    this.name = page.locator('#aname');
    this.loginButton = page.locator('#abtn-login');
    this.registerButton = page.locator('#abtn-reg');
    this.error = page.locator('#aerr');
    this.heading = page.locator('#asub');
    this.cookieEssentialOnly = page.getByText('Tylko niezbędne');
  }

  async gotoLogin() {
    await this.page.goto('/app');
    await this.waitUntilLoaded();
    await this.dismissCookies();
  }

  async gotoRegister() {
    await this.page.goto('/app?mode=register');
    await this.waitUntilLoaded();
    await this.dismissCookies();
  }

  /** The app shows "Ładowanie..." in the heading until it has initialised. */
  async waitUntilLoaded() {
    await expect(this.heading).not.toHaveText(/Ładowanie/);
    await expect(this.heading).not.toBeEmpty();
  }

  async dismissCookies() {
    if (await this.cookieEssentialOnly.isVisible()) {
      await this.cookieEssentialOnly.click();
    }
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  /** Fills the registration form and clicks "Zarejestruj". Callers must only use invalid data. */
  async submitRegistration({ email = '', password = '', repeat = '', name = '' }) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.passwordRepeat.fill(repeat);
    await this.name.fill(name);
    await this.registerButton.click();
  }

  async expectError(text) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toHaveText(text);
  }
}

module.exports = { LoginPage };
