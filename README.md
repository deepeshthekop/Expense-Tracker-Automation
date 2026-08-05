# Expense Tracker Automation (Playwright + TypeScript)

[![Playwright Tests](https://img.shields.io/badge/tests-playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/language-typescript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Automated UI testing framework for an Expense Tracker web application using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

---

## About the Project

This repository contains end-to-end automation tests for an Expense Tracker web app.  
The framework is designed to be scalable and maintainable through a separation of concerns:

- Test scenarios in spec files
- Page behavior in Page Objects
- Reusable components for shared UI interactions

---

## Tech Stack

- **Language:** TypeScript
- **Automation Tool:** Playwright
- **Pattern:** Page Object Model (POM)
- **Runtime:** Node.js

---

## Framework Structure

```text
Expense-Tracker-Automation/
├── .github/workflows/playwright.yml   # CI workflow
├── pages/                              # Page Objects and UI components
│   ├── dashboard.page.ts
│   ├── login.page.ts
│   └── nav.component.ts
├── tests/e2e/                          # End-to-end test specs
│   ├── dashboard.spec.ts
│   ├── login.spec.ts
│   └── logout.spec.ts
├── playwright.config.ts                # Playwright configuration
├── package.json                        # Dependencies and project metadata
└── README.md
```

---

## Prerequisites

Install:

- **Node.js** (v18+ recommended)
- **npm** (bundled with Node.js)

Verify:

```bash
node -v
npm -v
```

---

## Setup Instructions

### 1) Clone the repository

```bash
git clone https://github.com/deepeshthekop/Expense-Tracker-Automation.git
cd Expense-Tracker-Automation
```

### 2) Install dependencies

```bash
npm install
```

### 3) Install Playwright browsers

```bash
npx playwright install
```

### 4) (Linux only, if needed) Install browser system dependencies

```bash
npx playwright install-deps
```

---

## Configuration

Environment variables currently used by tests/CI:

- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`

The Playwright `baseURL` is currently set directly in `playwright.config.ts`.

- `https://my-expense-tracker-beta.vercel.app/`

If you want the environment-based URLs (for local/staging/prod), update `playwright.config.ts` to read from environment variables.

> Never commit real secrets. Add `.env` to `.gitignore`. Use tools like `dotenv` or `GitHub Actions secrets` for secure management.

---

## Running Tests Locally

### Run all tests (headless)

```bash
npx playwright test
```

### Run in headed mode

```bash
npx playwright test --headed
```

### Run interactive UI mode

```bash
npx playwright test --ui
```

### Run a specific spec file

```bash
npx playwright test tests/<file-name>.spec.ts
```

### Run tests matching a title

```bash
npx playwright test -g "should create a new expense"
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
```

---

## Test Reports

Open HTML report after execution:

```bash
npx playwright show-report
```

Useful debugging options:

```bash
npx playwright test --trace on
npx playwright test --debug
```

---

## CI with GitHub Actions

CI is already configured in:

- `.github/workflows/playwright.yml`

Current workflow behavior:

- Runs on push and pull request to `main` and `master`
- Uses `actions/setup-node@v4` with `node-version: lts/*`
- Installs dependencies with `npm ci`
- Installs Playwright browsers with dependencies
- Runs `npx playwright test`
- Uploads Playwright HTML report artifact (`retention-days: 30`)

Required GitHub secrets for CI:

- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`

---

## Current Test Coverage

The current E2E suite includes:

- Login flow
- Logout flow
- Dashboard validation flow

As the suite grows, add additional coverage for expense and budget workflows.

---

## Useful Commands

```bash
# Run all tests
npx playwright test

# Debug test execution
npx playwright test --debug

# Open Playwright inspector/codegen
npx playwright codegen <APP_URL>

# Update snapshots (if using visual assertions)
npx playwright test --update-snapshots
```

---

## Best Practices Followed

- POM for modularity and readability
- Reusable helpers and fixtures
- Stable locators (`getByRole`, `getByLabel`, `data-testid`)
- Minimal hard waits
- Clear, behavior-driven test naming
- CI-ready test execution and reporting

---

## Troubleshooting

### Browser executable issues
```bash
npx playwright install
```

### Flaky tests
- Improve selector strategy
- Avoid `waitForTimeout`
- Prefer built-in Playwright waiting and assertions
- Use traces/videos/screenshots for root-cause analysis

### Environment mismatch
- Validate `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` values
- Confirm target environment is reachable
- Confirm `.env` values are loaded in test runtime
- Re-check any test account constraints in the app

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add/update tests
4. Run tests locally
5. Open a pull request

---

If this project helps you, consider giving it a ⭐ on GitHub.