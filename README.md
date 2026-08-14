# Expense Tracker Automation (Playwright + TypeScript)

[![Playwright Tests](https://img.shields.io/badge/tests-playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/language-typescript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Automated UI and API testing framework for an Expense Tracker web application using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

- Test scenarios in spec files (UI & direct API endpoints)
- Page behavior encapsulated in Page Objects
- Dependency injection managed via Custom Page Fixtures
- Shared UI components for common navigation
- Authentication state management for faster test execution
- Code quality enforcement via ESLint, Prettier, and Husky Git hooks

---

## Tech Stack

- **Language:** TypeScript
- **Automation Tool:** Playwright
- **Pattern:** Page Object Model (POM) & Custom Fixtures
- **Runtime:** Node.js

---

## Framework Structure

```
Expense-Tracker-Automation/
├── .auth/user.json                    # Auto-generated session state
├── .github/workflows/playwright.yml   # CI workflow
├── .husky/                            # Git hooks managed by Husky
├── fixtures/                          # Custom Playwright fixtures
├── pages/                             # Page Objects and UI components
├── tests/                             # Test specs and setup scripts
│   ├── auth.setup.ts                  # One-time login setup project script
│   ├── api/                           # API test specs
│   └── e2e/                           # End-to-end test specs
├── playwright.config.ts               # Playwright configuration
├── package.json                       # Dependencies and project metadata
├── eslint.config.mjs                  # ESLint configuration
├── .prettierrc                        # Prettier configuration
├── .prettierignore                    # Prettier ignore file
├── .gitignore                         # Git ignore file
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

### 5) Set up ESLint for Code Linting

ESLint is already configured in this project to enforce consistent code style. The configuration file is located at `eslint.config.mjs`.

### 6) Install Husky Git Hooks

```bash
npx husky install
```

### 7) Set up Prettier for Code Formatting

Prettier is already configured in this project to enforce consistent code formatting. The configuration file is located at `.prettierrc`.

---

## Configuration

### Environment Variables

Required environment variables in your `.env` file (at project root):

- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`
- `TEST_USER_NAME`

### Base URL & Global Authentication (`storageState`)

The Playwright `baseURL` is configured in `playwright.config.ts`:

- `https://my-expense-tracker-beta.vercel.app`

Instead of running a full UI login before every test, this framework uses Playwright's **Setup Dependencies** and `storageState`:

1. The `setup` project runs `tests/auth.setup.ts` once before any test runs.
2. It performs UI login once using environment credentials and saves the authenticated state to `.auth/user.json`.
3. Test projects (e.g., `chromium`) automatically inherit `.auth/user.json` to launch pre-authenticated browser instances.
4. Native API requests automatically inherit session cookies from `.auth/user.json` to hit protected API endpoints directly.

> **Security Note:** Session files contain sensitive live tokens. `.auth/` and `.env` are listed in `.gitignore` and should never be committed to source control.

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
- `TEST_USER_NAME`

---

## Code Quality

This project uses **ESLint** for code linting and **Husky** for managing Git hooks.

### Linting with ESLint

ESLint is configured to enforce consistent code style and catch potential issues. The configuration file is located at `eslint.config.mjs`.

Run the linter:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

### Code Formatting with Prettier

This project uses **Prettier** to enforce consistent code formatting. The configuration file is located at `.prettierrc`, and ignored files are listed in `.prettierignore`.

#### Run Prettier

To check for formatting issues:

```bash
npm run format:check
```

To fix formatting issues:

```bash
npm run format
```

> Prettier is also integrated with Husky, so staged code, config files and docs will be checked for formatting issues before every commit.

### Pre-commit Hooks with Husky

Husky is used to enforce pre-commit checks. The `pre-commit` hook runs ESLint to ensure code quality before commits are made.

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
npx playwright test tests/e2e/<file-name>.spec.ts
```

### Run tests matching a title

```bash
npx playwright test -g "should create a new expense"
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
```

### Debug test execution

```bash
npx playwright test --debug
```

### Open Playwright inspector/codegen

```bash
npx playwright codegen <APP_URL>
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

## Best Practices Followed

- POM for modularity and readability
- Reusable helpers and fixtures
- Stable locators (`getByRole`, `getByLabel`, `data-testid`)
- Minimal hard waits
- Clear, behavior-driven test naming
- CI-ready test execution and reporting
- Code linting with ESLint
- Pre-commit hooks with Husky
- Code formatting with Prettier
- Environment variable management with `.env` and `dotenv`
- Authentication state management with `storageState` and `.auth/`

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add/update tests
4. Run tests locally
5. Open a pull request

---

If this project helps you, consider giving it a ⭐ on GitHub.
