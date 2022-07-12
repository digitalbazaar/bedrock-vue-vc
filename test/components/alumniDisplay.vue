<template>
  <div class="column justify-evenly">
    <div
      class="cd-content col column items-center justify-start q-pb-md">
      <credential-field
        title="Granted by"
        value="Example University" />
      <credential-card-image
        :src="credentialImage"
        size="lg" />
      <credential-field
        class="col text-center"
        :title="credentialName"
        title-class="text-subtitle1"
        :value="credentialDescription"
        value-class="text-body2 text-grey-7" />
    </div>
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {
  CredentialField,
  CredentialCardImage,
  useCredentialCommon
} from '@bedrock/vue-credential-card';

import {defineProps, toRef} from 'vue';

const props = defineProps({
  credential: {
    type: Object,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  }
});

const {
  credentialName, credentialImage,
  issuerName, credentialDescription
} = useCredentialCommon({
  credential: toRef(props, 'credential')
});

</script>

<style lang="scss" scoped>

</style>
