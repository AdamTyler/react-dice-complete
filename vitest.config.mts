import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Avoid loading the project's postcss.config.js during tests; the components
  // import .scss only for side effects, which we don't need in jsdom.
  css: { postcss: { plugins: [] } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // .scss imports are side-effect only in the components; stub them out
    css: false,
    include: ['lib/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['lib/**/*.{ts,tsx}'],
      exclude: ['lib/**/*.test.{ts,tsx}', 'lib/scss.d.ts'],
    },
  },
})
