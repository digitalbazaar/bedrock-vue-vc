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
  // ensure peer deps can be found in test `node_modules` dir
  modules: [path.resolve(__dirname, 'node_modules')]
};
