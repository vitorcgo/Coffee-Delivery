import { defineConfig } from '@playwright/test'

const port = 4173
const baseURL = 'http://127.0.0.1:' + port

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL,
    browserName: 'chromium',
    viewport: { width: 1440, height: 1013 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port ' + port + ' --strictPort',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
})
