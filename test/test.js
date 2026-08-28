/*!
 * Copyright (c) 2018-2026 Digital Bazaar, Inc.
 */
import * as bedrock from '@bedrock/core';
import '@bedrock/views';
import '@bedrock/webpack';

import './config.js';

import '@bedrock/test';
import '@bedrock/karma';

bedrock.start();
