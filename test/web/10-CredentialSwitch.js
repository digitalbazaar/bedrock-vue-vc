/*!
 * Copyright (c) 2018-2026 Digital Bazaar, Inc.
 */
import {
  alumniCredential, basicCredential, openBadgeCredential,
  openBadgeCredentialEmptyTopLevelDescription,
  openBadgeCredentialNoTopLevelDescription,
  openBadgeCredentialStringAchievementImage
} from './mock-credentials.js';
import {CredentialSwitch, registerComponent} from '@bedrock/vue-vc';
import AlumniDisplay from '../components/examples/alumniDisplay.vue';
import {config} from '@bedrock/web';
import {createApp} from 'vue';
import iconSet from 'quasar/icon-set/fontawesome-v5.mjs';
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

  it('should clamp the description to 2 lines instead of ' +
    'truncating to 1', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: basicCredential}});
    should.exist(vm);
    const value = vm.$el.querySelector('.cf-value');
    should.exist(value);
    value.classList.contains('ellipsis').should.equal(false);
    value.style.webkitLineClamp.should.equal('2');
    tearDown(app);
  });

  it('should render the column layout by default', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: basicCredential}});
    should.exist(vm);
    should.exist(vm.$el.querySelector(':scope > .column'));
    should.not.exist(vm.$el.querySelector(':scope > .row'));
    tearDown(app);
  });

  it('should render the row layout when `layout` is "row"', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: basicCredential, layout: 'row'}});
    should.exist(vm);
    should.exist(vm.$el.querySelector(':scope > .row'));
    should.not.exist(vm.$el.querySelector(':scope > .column'));
    vm.$el.querySelector('.cf-title').textContent
      .trim().should.equal('Test Credential');
    vm.$el.querySelector('.cf-value').textContent
      .trim().should.equal(basicCredential.description);
    tearDown(app);
  });

  it('should fall back to the column layout for an unknown `layout`',
    async () => {
      const {app, vm} = await renderCredential({
        propsData: {credential: basicCredential, layout: 'bogus'}});
      should.exist(vm);
      should.exist(vm.$el.querySelector(':scope > .column'));
      tearDown(app);
    });

  it('should clamp the description to 2 lines in the row layout', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: basicCredential, layout: 'row'}});
    should.exist(vm);
    const value = vm.$el.querySelector('.cf-value');
    should.exist(value);
    value.classList.contains('ellipsis').should.equal(false);
    value.style.webkitLineClamp.should.equal('2');
    tearDown(app);
  });

  it('should apply `maxWidth` in the row layout', async () => {
    const {app, vm} = await renderCredential({
      propsData: {
        credential: basicCredential, layout: 'row', maxWidth: '150px'
      }});
    should.exist(vm);
    vm.$el.querySelector('.cf-value').style.maxWidth.should.equal('150px');
    vm.$el.querySelector('.cf-title').style.maxWidth.should.equal('150px');
    tearDown(app);
  });

  it('should resolve an OBv3 achievement image when no top-level ' +
    'image is present', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: openBadgeCredential}});
    should.exist(vm);
    should.exist(vm.$el);
    const img = vm.$el.querySelector('img');
    should.exist(img);
    img.getAttribute('src').should.equal(
      openBadgeCredential.credentialSubject.achievement.image.id);
    tearDown(app);
  });

  it('should resolve an OBv3 achievement image when it is a plain ' +
    'string URL instead of an image object', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: openBadgeCredentialStringAchievementImage}});
    should.exist(vm);
    should.exist(vm.$el);
    const img = vm.$el.querySelector('img');
    should.exist(img);
    img.getAttribute('src').should.equal(
      openBadgeCredentialStringAchievementImage
        .credentialSubject.achievement.image);
    tearDown(app);
  });

  it('should resolve an OBv3 achievement description when no top-level ' +
    'description is present', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: openBadgeCredentialNoTopLevelDescription}});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-value').textContent.trim().should.equal(
      openBadgeCredentialNoTopLevelDescription
        .credentialSubject.achievement.description);
    tearDown(app);
  });

  it('should resolve an OBv3 achievement description when the ' +
    'top-level description is an explicit empty string', async () => {
    const {app, vm} = await renderCredential({
      propsData: {credential: openBadgeCredentialEmptyTopLevelDescription}});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.cf-value').textContent.trim().should.equal(
      openBadgeCredentialEmptyTopLevelDescription
        .credentialSubject.achievement.description);
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
          details: [{component: 'AlumniDisplay'}]
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
