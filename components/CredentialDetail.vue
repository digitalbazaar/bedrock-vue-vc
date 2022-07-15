<template>
  <div class="column justify-evenly">
    <div
      class="cd-content col column items-center justify-start q-pb-md">
      <credential-field
        title="Issued by"
        :value="issuerName" />
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
import {defineProps, toRef} from 'vue';
import DynamicImage from './DynamicImage.vue';
import CredentialField from './CredentialField.vue';
import {useCredentialCommon} from './credentialCommon.js';

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
  credentialName, credentialImage,
  issuerName, credentialDescription
} = useCredentialCommon({
  credential: toRef(props, 'credential')
});
</script>

<style lang="scss" scoped>
</style>
