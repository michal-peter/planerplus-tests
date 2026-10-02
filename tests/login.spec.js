const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

const { TEST_EMAIL, TEST_PASSWORD } = process.env;
const hasCredentials = Boolean(TEST_EMAIL && TEST_PASSWORD);

test.describe('Login', () => {
  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.gotoLogin();
  });

  test.describe('with test account', () => {
    test.skip(!hasCredentials, 'TEST_EMAIL / TEST_PASSWORD not set');

    test('valid credentials log the user in', async ({ page }) => {
      await login.login(TEST_EMAIL, TEST_PASSWORD);
      await new DashboardPage(page).expectAuthenticated();
    });

    test('wrong password is rejected', async () => {
      await login.login(TEST_EMAIL, `${TEST_PASSWORD}-wrong`);
      await login.expectError('Złe dane logowania — sprawdź email i hasło');
    });
  });

  test('non-existent email is rejected', async () => {
    await login.login('no-such-user-qa@example.com', 'SomePassword123');
    await login.expectError('Złe dane logowania — sprawdź email i hasło');
  });

  test('empty fields show a prompt', async () => {
    await login.loginButton.click();
    await login.expectError('Wpisz email i hasło');
  });

  test('only email filled shows a prompt', async () => {
    await login.email.fill('someone@example.com');
    await login.loginButton.click();
    await login.expectError('Wpisz email i hasło');
  });

  test('only password filled shows a prompt', async () => {
    await login.password.fill('SomePassword123');
    await login.loginButton.click();
    await login.expectError('Wpisz email i hasło');
  });

  for (const badEmail of ['abc', 'user@', '@example.com', 'user example@x.pl']) {
    test(`invalid email format "${badEmail}" is rejected`, async () => {
      await login.login(badEmail, 'SomePassword123');
      await login.expectError('Nieprawidłowy adres email');
    });
  }
});
