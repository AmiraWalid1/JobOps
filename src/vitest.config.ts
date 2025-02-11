// eslint-disable-next-line n/no-unpublished-import
import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // Use Node.js environment
    include: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
    coverage: {
      provider: 'v8', // Use V8 for coverage
      reporter: ['text', 'json', 'html'], // Generate coverage reports
    },
  },
});
