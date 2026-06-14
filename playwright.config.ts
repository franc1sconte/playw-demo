import { defineConfig, devices } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const TUNI_AUTH_FILE = join(__dirname, 'playwright/.auth/siglo-tuni.json');

const envPath = join(__dirname, '.env');
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .forEach(line => {
      const match = line.trim().match(/^([^#=][^=]*)=(.*)$/);
      if (match) process.env[match[1].trim()] ??= match[2].trim();
    });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './global-setup',
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  expect: {
    // OAuth redirect chains to siglo21.educabot.com can take several seconds.
    timeout: 15000,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // Siglo suite requires pre-authenticated TUNI state (produced by globalSetup).
    {
      name: 'siglo',
      use: {
        ...devices['Desktop Chrome'],
        storageState: TUNI_AUTH_FILE,
      },
      testMatch: '**/tests/siglo/**/*.spec.ts',
    },

    {
      name: 'tuni-desktop',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/tests/tuni-desktop/**/*.spec.ts',
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/tests/siglo/**', '**/tests/tuni-desktop/**'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/tests/siglo/**', '**/tests/tuni-desktop/**'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/tests/siglo/**', '**/tests/tuni-desktop/**'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
