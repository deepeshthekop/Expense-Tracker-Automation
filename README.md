# Expense Tracker Automation (Playwright + TypeScript)

[![Playwright Tests](https://img.shields.io/badge/tests-playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/language-typescript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Automated UI test framework for an Expense Tracker web application using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

---

## 📚 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Framework Structure](#framework-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running Tests Locally](#running-tests-locally)
- [Test Reports](#test-reports)
- [CI with GitHub Actions](#ci-with-github-actions)
- [Useful Commands](#useful-commands)
- [Best Practices Followed](#best-practices-followed)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## About the Project

This repository contains end-to-end automation tests for an expense tracker web app.  
The framework is designed to be scalable and maintainable through separation of concerns:

- Test scenarios in spec files
- Page behavior in Page Objects
- Shared helpers/utilities for reuse

Typical workflows covered:

- Authentication/login/logout
- Dashboard navigation and summary checks
- Adding/editing/deleting budgets and expenses
- UI behavior and regression checks

---

## Tech Stack

- **Language:** TypeScript
- **Automation Tool:** Playwright
- **Pattern:** Page Object Model (POM)
- **Runtime:** Node.js

---

## Framework Structure

> Folder names can vary slightly based on your current implementation.

```text
Expense-Tracker-Automation/
├── tests/                     # Test specifications (business flows)
├── pages/                     # Page Objects (locators + actions)
├── utils/ or fixtures/        # Reusable helpers, test data, fixtures
├── playwright.config.ts       # Global Playwright config
├── package.json               # Scripts + dependencies
├── tsconfig.json              # TypeScript configuration
├── .env.example               # Example env variables
└── README.md
```

### Structure Philosophy

- **tests/** keeps assertions and scenarios readable
- **pages/** centralizes selectors and page interactions
- **utils/fixtures/** avoids duplication
- **config** controls retries, reporters, parallelism, and environments

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

## Environment Variables

Create a `.env` file in the project root (or use your preferred environment setup).

Example `.env.example`:

```env
# Application base URL
BASE_URL=https://your-expense-tracker-url.com

# Test user credentials (example names - adapt to your app)
TEST_USER_EMAIL=testuser@example.com
TEST_USER_PASSWORD=your_password_here

# Optional: API endpoints / tokens if your tests need them
# API_BASE_URL=https://api.your-app.com
# API_TOKEN=your_token_here
```

> Never commit real secrets. Add `.env` to `.gitignore`.

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

If not already present, create this workflow file:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
          TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
          TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}

      - name: Upload Playwright report (always)
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

### Configure repository secrets

In GitHub: **Repo → Settings → Secrets and variables → Actions → New repository secret**

Add (as needed):

- `BASE_URL`
- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`

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

### Executable doesn't exist / browser issues
```bash
npx playwright install
```

### Flaky tests
- Improve selector strategy
- Avoid `waitForTimeout`
- Prefer built-in Playwright waiting and assertions
- Use traces/videos/screenshots for root-cause analysis

### Environment mismatch
- Validate `BASE_URL` and credentials
- Confirm target environment is reachable
- Confirm `.env` values are loaded in test runtime

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add/update tests
4. Run tests locally
5. Open a pull request

---

If this project helps you, consider giving it a ⭐ on GitHub.