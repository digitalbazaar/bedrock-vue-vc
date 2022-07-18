/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import '@bedrock/karma';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config.karma.suites['bedrock-vue-vc'] = path.join('web', '**', '*.js');
config.karma.config.proxies = {
  '/': 'https://localhost:18443'
};
config.karma.config.proxyValidateSSL = false;

// TODO: consider moving to `bedrock-karma`?
config.karma.config.webpack.resolve = {
  alias: {
    quasar$: path.resolve(
      __dirname, 'node_modules/quasar/dist/quasar.umd.js'),
    vue$: path.resolve(
      __dirname, 'node_modules/vue/dist/vue.cjs.js'),
    '@bedrock/web': path.resolve(
      __dirname, 'node_modules/@bedrock/web/lib/index.js')
  }
};
