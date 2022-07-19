<template>
  <div class="column justify-evenly">
    <div
      class="cd-content col column items-center justify-start q-pb-md">
      <credential-field
        title="Granted by"
        value="Example University" />
      <dynamic-image
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
  DynamicImage,
  useCredentialCommon
} from '@bedrock/vue-vc';

import {defineProps, toRef} from 'vue';

const props = defineProps({
  credential: {
    type: Object,
    default: null
  },
  dense: {
    type: Boolean,
    default: false
  }
});

const {
  credentialName, credentialImage, credentialDescription
} = useCredentialCommon({
  credential: toRef(props, 'credential')
});

</script>

<style lang="scss" scoped>

</style>
