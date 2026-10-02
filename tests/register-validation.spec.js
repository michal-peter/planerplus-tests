const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

/**
 * Registration form validation only. The form is never really submitted:
 * the Firebase sign-up endpoint is stubbed in beforeEach, so no account can be created
 * on production even if a test passes client-side validation.
 */
test.describe('Registration form validation', () => {
  let register;
  let signUpCalls;

  test.beforeEach(async ({ page }) => {
    signUpCalls = 0;
    await page.route('**/accounts:signUp*', async (route) => {
      signUpCalls += 1;
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: { code: 400, message: 'INVALID_EMAIL' } }),
      });
    });
    register = new LoginPage(page);
    await register.gotoRegister();
  });

  test('shows the registration form with a password hint', async ({ page }) => {
    await expect(register.heading).toHaveText('Nowe konto');
    await expect(page.getByText('Hasło musi mieć minimum 6 znaków')).toBeVisible();
  });

  test('empty form asks for email and password', async () => {
    await register.registerButton.click();
    await register.expectError('Wpisz email i hasło');
    expect(signUpCalls).toBe(0);
  });

  test('missing password asks for email and password', async () => {
    await register.submitRegistration({ email: 'valid@example.com', name: 'Jan Kowalski' });
    await register.expectError('Wpisz email i hasło');
    expect(signUpCalls).toBe(0);
  });

  test('missing email asks for email and password', async () => {
    await register.submitRegistration({ password: 'abcdef1', repeat: 'abcdef1', name: 'Jan Kowalski' });
    await register.expectError('Wpisz email i hasło');
    expect(signUpCalls).toBe(0);
  });

  // Boundary values around the 6-character minimum: 1 and 5 are invalid.
  for (const password of ['a', 'abcd1']) {
    test(`password of ${password.length} character(s) is too short`, async () => {
      await register.submitRegistration({ email: 'valid@example.com', password, repeat: password, name: 'Jan' });
      await register.expectError('Hasło musi mieć min. 6 znaków');
      expect(signUpCalls).toBe(0);
    });
  }

  test('password of exactly 6 characters passes the length check', async () => {
    await register.submitRegistration({ email: 'valid@example.com', password: 'abcde1', repeat: 'abcde1', name: 'Jan' });
    await expect.poll(() => signUpCalls).toBe(1); // reached the (stubbed) backend
    await expect(register.error).not.toHaveText('Hasło musi mieć min. 6 znaków');
  });

  test('different repeated password is rejected', async () => {
    await register.submitRegistration({ email: 'valid@example.com', password: 'abcde1', repeat: 'abcde2', name: 'Jan' });
    await register.expectError('Hasła się różnią');
    expect(signUpCalls).toBe(0);
  });

  test('invalid email format is rejected', async () => {
    await register.submitRegistration({ email: 'not-an-email', password: 'abcde1', repeat: 'abcde1', name: 'Jan' });
    await register.expectError('Nieprawidłowy adres email');
  });
});
