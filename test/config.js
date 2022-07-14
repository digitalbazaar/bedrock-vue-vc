/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import '@bedrock/views';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config.paths.cache = path.join(__dirname, '.cache');

// add images
config.express.static.push({
  route: '/images',
  path: path.join(__dirname, 'components', 'images')
});
// add pseudo packages
config.views.bundle.packages.push({
  path: path.join(__dirname, 'components'),
  manifest: path.join(__dirname, 'package.json')
});
