import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  testMatch: /.*\.e2e-spec\.ts$/,
  // reporter: 'html',
  use: {
    baseURL: 'http://localhost:50789',
  },
  webServer: {
    command: 'pnpm dev:msw',
    url: 'http://localhost:50789',
    reuseExistingServer: !process.env.CI,
  },
  // projects: [
  // {
  //   name: 'chromium',
  //   use: { ...devices['Desktop Chrome'] },
  // },
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },
  // ],
})
