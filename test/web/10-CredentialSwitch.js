/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import AlumniDisplay from './../components/examples/alumniDisplay.vue';
import {alumniCredential, basicCredential} from './mock-credentials.js';
import {config} from '@bedrock/web';
import {CredentialSwitch, registerComponent} from '@bedrock/vue-vc';
import {default as iconSet} from 'quasar/icon-set/fontawesome-v5.js';
import Quasar from 'quasar';
import Vue from 'vue'


function tearDown(app) {
  return app.unmount();
}

function createApp({props}) {
  const app = Vue.createApp(CredentialSwitch, props);
  app.use(Quasar);
  Quasar.iconSet.set(iconSet);
  return app;
}

// helper function that mounts and returns the rendered text
function renderCredential({app = null, props = {}}) {
  if(!app) {
    app = createApp({props});
  }
  const vm = app.mount('*');
  return {app, vm};
}

describe('CredentialSwitch', () => {
  it('should render basic credential in list mode', async () => {
    const {app, vm} = await renderCredential({props: {credential: basicCredential}});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-title').textContent
      .trim().should.equal('Test Credential');
    vm.$el.querySelector('.cf-value').textContent
      .trim().should.equal(basicCredential.description);
    tearDown(app)
  });

  it('should render basic credential in details mode', async () => {
    const {vm, app} = await renderCredential({props: {
      credential: basicCredential, mode: 'details'}});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-title').textContent
      .trim().should.equal('Test Credential');
    vm.$el.querySelector('.cf-value').textContent
      .trim().should.equal(basicCredential.description);
    tearDown(app)
  });

  it('should render credential for registered component', async () => {
    const app = await createApp({props: {credential: alumniCredential, mode: 'details'}});
    await registerComponent({app, component: AlumniDisplay, name: 'AlumniDisplay'});
    config.credentialDisplay = {
      registration: [{
        acceptableTypes: ['AlumniCredential'],
        components: {
          details: [{component: 'AlumniDisplay'}],
        }
      }]
    };
    const {vm} = renderCredential({app})
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-title').textContent
      .trim().should.equal('Granted by');
    vm.$el.querySelector('.cf-value').textContent
      .trim().should.equal(alumniCredential.credentialSubject.alumniOf.name[0].value);
    tearDown(app)
  });
});
