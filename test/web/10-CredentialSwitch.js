/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {alumniCredential, basicCredential} from './mock-credentials.js';
import {CredentialSwitch, registerComponent} from '@bedrock/vue-vc';
import AlumniDisplay from '../components/examples/alumniDisplay.vue';
import {config} from '@bedrock/web';
import {createApp} from 'vue';
import {default as iconSet} from 'quasar/icon-set/fontawesome-v5.js';
import {Quasar} from 'quasar';

function tearDown(app) {
  return app.unmount();
}

function _createApp({propsData = {}}) {
  const app = createApp(CredentialSwitch, propsData);
  app.use(Quasar);
  Quasar.iconSet.set(iconSet);
  return app;
}

// helper function that mounts and returns the rendered text
function renderCredential({app = null, propsData = {}}) {
  if(!app) {
    app = _createApp({propsData});
  }
  const vm = app.mount('*');
  return {app, vm};
}

describe('CredentialSwitch', () => {
  it('should render basic credential in list mode', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: basicCredential}});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-title').textContent
      .trim().should.equal('Test Credential');
    vm.$el.querySelector('.cf-value').textContent
      .trim().should.equal(basicCredential.description);
    tearDown(app);
  });

  it('should render basic credential in details mode', async () => {
    const {vm, app} = await renderCredential({propsData: {
      credential: basicCredential, mode: 'details'}});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-title').textContent
      .trim().should.equal('Test Credential');
    vm.$el.querySelector('.cf-value').textContent
      .trim().should.equal(basicCredential.description);
    tearDown(app);
  });

  it('should render credential for registered component', async () => {
    const app = await _createApp({
      propsData: {credential: alumniCredential, mode: 'details'}});
    await registerComponent({
      app, component: AlumniDisplay, name: 'AlumniDisplay'});
    config.credentialDisplay = {
      registration: [{
        acceptableTypes: ['AlumniCredential'],
        components: {
          details: [{component: 'AlumniDisplay'}],
        }
      }]
    };
    const {vm} = renderCredential({app});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-title').textContent
      .trim().should.equal('Granted by');
    vm.$el.querySelector('.cf-value').textContent
      .trim().should.equal(
        alumniCredential.credentialSubject.alumniOf.name[0].value);
    tearDown(app);
  });
});
