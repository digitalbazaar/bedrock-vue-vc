/*!
 * Copyright (c) 2026 Digital Bazaar, Inc.
 */
import {defineConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {alias: {quasar: 'quasar/dist/quasar.client.js'}},
  test: {
    environment: 'jsdom',
    include: ['test/unit/**/*.spec.js']
  }
});
