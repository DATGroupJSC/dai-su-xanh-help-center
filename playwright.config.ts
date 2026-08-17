import {defineConfig, devices} from '@playwright/test';

const browserExecutablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:3000/',
    trace: 'on-first-retry',
    launchOptions: browserExecutablePath
      ? {executablePath: browserExecutablePath}
      : undefined,
  },
  projects: [
    {
      name: 'desktop',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'mobile',
      use: {...devices['Pixel 7']},
    },
  ],
  webServer: {
    command: 'npm run serve -- --host 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
