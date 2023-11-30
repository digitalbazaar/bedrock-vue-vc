<template>
  <div class="column justify-evenly">
    <div
      class="cd-content col column items-center justify-start q-pb-md">
      <credential-field
        title="Issued by"
        :value="issuerName" />
      <dynamic-image
        class="q-mx-md"
        :src="credentialImage"
        size="lg" />
      <credential-field
        :title="name"
        :value="description"
        class="col text-center"
        title-class="text-subtitle1"
        value-class="text-body2 text-grey-7" />
    </div>
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {computed, defineProps, toRef, unref} from 'vue';
import CredentialField from './CredentialField.vue';
import DynamicImage from './DynamicImage.vue';
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

const name = computed(() => {
  const name = unref(credentialName);
  return name || 'No credential name available.';
});

const description = computed(() => {
  const description = unref(credentialDescription);
  return description || 'No description available.';
});
</script>

<style lang="scss" scoped>
</style>
