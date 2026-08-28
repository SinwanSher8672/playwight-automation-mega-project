# Playwright Automation Mega Project

This is a test automation project I built with Playwright and TypeScript, mainly as a way to properly transition from Cypress to Playwright and cover the kind of scenarios you actually run into in real projects, not just the basic login/checkout stuff.

The project follows the Page Object Model throughout, so locators and actions live in page classes, and the spec files only handle assertions.

## What's covered

- Forms and basic UI interactions, built on top of a proper POM structure
- iFrames, including nested iframes (one iframe inside another)
- JS dialogs — alert, confirm, and prompt
- Multiple tabs/windows
- File upload and download, with the downloaded file verified on disk
- Session/storage state, so tests don't have to log in through the UI every single time
- API testing (GET, POST, PUT, DELETE) with both positive and negative cases
- A hybrid API + UI pattern, where login happens through the API and the session is reused in the browser
- Network mocking with page.route(), for testing error states and edge cases that are hard to trigger against a real server
- Cross-browser runs across Chromium, Firefox, and WebKit
- HTML reporting, trace viewer, and screenshots/video on failure
- A GitHub Actions workflow that runs the suite on every push and pull request

## Project structure

```
playwright-mega-project/
├── tests/
│   ├── pages/                  Page object classes
│   ├── login.spec.ts
│   ├── iframe.spec.ts
│   ├── alerts.spec.ts
│   ├── tabs.spec.ts
│   ├── upload-download.spec.ts
│   ├── session.spec.ts
│   ├── api/
│   │   ├── api.spec.ts
│   │   ├── hybrid.spec.ts
│   │   └── mocking.spec.ts
│   └── auth.setup.ts
├── test-data/
├── playwright.config.ts
├── tsconfig.json
└── .github/workflows/playwright.yml
```

## Running it

Install dependencies and browsers:

```bash
npm install
npx playwright install --with-deps
```

Run everything:

```bash
npx playwright test
```

Run a single file:

```bash
npx playwright test tests/login.spec.ts
```

Run with the browser visible:

```bash
npx playwright test --headed
```

Open the interactive UI mode:

```bash
npx playwright test --ui
```

View the last report:

```bash
npx playwright show-report
```

## A few things worth explaining

The login state is created once in `auth.setup.ts` and saved to `playwright/.auth/user.json`. The chromium, firefox, and webkit projects in `playwright.config.ts` depend on that setup project and reuse the saved state, so most tests start already logged in instead of repeating the login flow.

For the network mocking tests, requests are made with `fetch()` inside `page.evaluate()` rather than through the `request` fixture. `page.route()` only intercepts requests that actually go through the page's own browser context, and calls made through `request` (or `page.request`) don't go through that context, so they never get intercepted.

The `playwright/.auth` folder is git-ignored since it holds session data.

A few of the test targets are public demo sites (SauceDemo, the-internet.herokuapp.com, LetCode, reqres.in), used purely for practice, not tied to any real product.

## Author

Sinwan Sher
