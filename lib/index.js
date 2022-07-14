/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import './config.js';

export {default as CredentialBase} from '../components/CredentialBase.vue';
export {default as CredentialField} from '../components/CredentialField.vue';
export {default as DynamicImage} from
  '../components/DynamicImage.vue';
export {useCredentialCommon} from '../components/credentialCommon.js';

export {default as CredentialSwitch} from '../components/CredentialSwitch.vue';

export const registerComponent = async ({app, component, name = ''}) => {
  app.component(`${name}`, component);
};

export const registerComponents = async ({app, components}) => {
  for(const component of components) {
    await registerComponent({
      app, component: component.value,
      name: component.name
    });
  }
};
