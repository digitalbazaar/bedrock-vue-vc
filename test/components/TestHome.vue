<template>
  <q-page
    class="column q-col-gutter-md"
    padding>
    <div class="column items-center">
      <credential-switch
        :credential="alumniCredential"
        :clickable="true" />
      <credential-switch
        style="max-width: 250px;"
        :credential="alumniCredential"
        :expandable="true" />
      <credential-switch
        mode="details"
        :credential="alumniCredential"
        :clickable="true" />
        <div style="border: 1px solid red; max-width: 600px" class="q-my-sm column q-gutter-sm">
          <credential-switch
            style=" max-width: 600px"
            class="q-ma-xs col"
            :dense="true"
            :expandable="true"
            :credential="alumniCredential" />
        </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {
  CredentialSwitch
} from '@bedrock/vue-credential-card';
import {alumniCredential} from './credentials';
const issuer = 'did:v1:test:1234';

// used for testing the truncation feature
let more = '';
for(let i = 0; i < 200; i++) {
  more += ' more ';
}

export default {
  name: 'TestHome',
  components: {
    CredentialSwitch
  },
  data() {
    return {
      alumniCredential,
      meta: {
        profile: {
          name: 'Business',
          color: '#3498DB',
          type: ['Profile', 'Person'],
        },
      }
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
