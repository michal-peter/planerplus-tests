# PlanerPlus – E2E tests

[![Playwright Tests](https://github.com/michal-peter/planerplus-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/michal-peter/planerplus-tests/actions/workflows/playwright.yml)

End-to-end tests for [PlanerPlus](https://planerplus.pl), a web CRM for insurance agents that I designed, built and maintain myself.

## What is tested
- Landing page: pricing plans, plan buttons open registration, login link
- Login: valid credentials, wrong password, unknown email, empty fields, invalid email format
- Registration form validation (messages for empty/invalid fields, 6-character password boundary)

All tests are non-destructive. They run against production, never create accounts and never submit a real registration (the sign-up request is stubbed).
Full list with techniques: [TEST_CASES.md](TEST_CASES.md).

## Project structure
```
pages/                  Page Object Model (LandingPage, LoginPage, DashboardPage)
tests/                  Specs: landing, login, register-validation
playwright.config.js    Config: baseURL, reporters, trace + screenshot on failure
TEST_CASES.md           Test case table
.env.example            Template for test account credentials
.github/workflows/      CI: runs tests, uploads HTML report and traces
```

## Stack
- Playwright (JavaScript), Chromium, Firefox and WebKit
- GitHub Actions: runs on every push and pull request; the HTML report and failure traces/screenshots are uploaded as artifacts

## Run locally
```
npm install
npx playwright install
cp .env.example .env   # then fill in TEST_EMAIL and TEST_PASSWORD
npx playwright test
npx playwright show-report
```
Tests that need a logged-in account are skipped when `TEST_EMAIL` / `TEST_PASSWORD` are not set. `.env` is git-ignored.

In CI the credentials come from the repository secrets `TEST_EMAIL` and `TEST_PASSWORD`.

## Next steps
- Client management flows (test account, credentials kept outside the repo)
- API tests (Postman)
