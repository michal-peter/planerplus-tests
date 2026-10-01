# PlanerPlus – E2E tests

End-to-end tests for [PlanerPlus](https://planerplus.pl), a web CRM for insurance agents that I designed, built and maintain myself.

## What is tested
- Landing page renders pricing plans
- "Choose plan" buttons open the registration form directly

## Stack
- Playwright (JavaScript)
- Runs on Chromium, Firefox and WebKit
- GitHub Actions – tests run automatically on every push

## Run locally
npm install
npx playwright install
npx playwright test

## Next steps
- Login and client management flows (test account, credentials kept outside the repo)
- API tests (Postman)