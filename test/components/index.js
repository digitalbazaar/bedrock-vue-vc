/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as brQuasar from '@bedrock/quasar';
import * as brVue from '@bedrock/vue';
import {config} from '@bedrock/web';

import {createRouter, createWebHistory} from 'vue-router';
import {default as iconSet} from 'quasar/icon-set/fontawesome-v5.js';
import Quasar from 'quasar';
import TestApp from '../components/TestApp.vue';

import './app.less';
import '@bedrock/web-fontawesome';

import {registerComponent} from '@bedrock/vue-vc';

import AlumniDisplay from './examples/alumniDisplay.vue';

brVue.initialize({
  async beforeMount({app}) {
    // show devtools
    app.config.devtools = true;

    const router = createRouter({
      history: createWebHistory(),
      routes: [{
        path: '/',
        component: () => import('./TestHome.vue'),
        meta: {title: 'Credential Card'}
      }]
    });
    brVue.augmentRouter({app, router});
    app.use(router);

    // initialize br-quasar
    await brQuasar.initialize({app});

    // configure quasar
    //iconSet.credentialCard = {defaultImage: 'fas fa-check'};
    Quasar.iconSet.set(iconSet);
    // await brQuasar.theme({
    //   brand: {
    //     primary: '#xxxxxx'
    //   }
    // });

    // Configure example alumni display component with
    // `credentialSwitch` for 'Alumni' credentials.
    await registerComponent({
      app, component: AlumniDisplay, name: 'AlumniDisplay'
    });

    config.credentialDisplay = {
      registration: [{
        acceptableTypes: ['AlumniCredential'],
        components: {
          details: [{component: 'AlumniDisplay'}],
        }
      }]
    };
    return TestApp;
  }
});
