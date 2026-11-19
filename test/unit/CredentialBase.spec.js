/*!
 * Copyright (c) 2026 Digital Bazaar, Inc.
 */
import {describe, expect, it} from 'vitest';
import {
  QIcon, QItem, QItemLabel, QItemSection, Quasar
} from 'quasar';
import CredentialBase from '../../components/CredentialBase.vue';
import {mount} from '@vue/test-utils';

const credential = {
  '@context': ['https://www.w3.org/ns/credentials/v2'],
  type: ['VerifiableCredential', 'OpenBadgeCredential'],
  name: 'Open Badge Credential',
  description: 'Awarded for completing the course.',
  issuer: {id: 'did:example:issuer'},
  credentialSubject: {id: 'did:example:subject'}
};

// Quasar components are registered explicitly because the plugin alone
// registers none and the assertions need the rendered markup
function mountBase({layout}) {
  return mount(CredentialBase, {
    props: {credential, layout},
    global: {
      plugins: [Quasar],
      components: {QIcon, QItem, QItemLabel, QItemSection},
      stubs: {CredentialSwitch: true, QDialog: true}
    }
  });
}

describe('CredentialBase row layout', () => {
  const layout = 'row';

  it('renders the name before the description', () => {
    const wrapper = mountBase({layout});
    const title = wrapper.get('.cf-title');
    const value = wrapper.get('.cf-value');
    expect(title.text()).toBe(credential.name);
    expect(value.text()).toBe(credential.description);
    expect(
      title.element.compareDocumentPosition(value.element) &
      Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('does not right-align the text or push the image apart', () => {
    const wrapper = mountBase({layout});
    expect(wrapper.find('.text-right').exists()).toBe(false);
    expect(wrapper.find('.justify-between').exists()).toBe(false);
    expect(wrapper.find('.q-mr-auto').exists()).toBe(false);
  });

  it('keeps the image before the text', () => {
    const wrapper = mountBase({layout});
    const image = wrapper.get('.credential-card-image-md');
    const title = wrapper.get('.cf-title');
    expect(
      image.element.compareDocumentPosition(title.element) &
      Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('CredentialBase column layout', () => {
  it('keeps the value before the name and right-aligned text', () => {
    const wrapper = mountBase({layout: 'column'});
    const title = wrapper.get('.cf-title');
    const value = wrapper.get('.cf-value');
    expect(
      value.element.compareDocumentPosition(title.element) &
      Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(title.classes()).toContain('text-right');
  });
});
