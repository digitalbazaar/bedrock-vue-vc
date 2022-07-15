<template>
  <component
    :is="selection"
    v-bind="{...$props, ...$attrs}">
    <template
      v-for="(_, slot) in $slots"
      #[slot]="scope">
      <slot
        :name="slot"
        v-bind="scope || {}" />
    </template>
  </component>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {computed, defineProps, unref} from 'vue';
import {config, extend} from '@bedrock/web';
import CredentialBase from './CredentialBase.vue';
import CredentialDetail from './CredentialDetail.vue';

const componentDefaults = {
  list: CredentialBase,
  details: CredentialDetail
};

const props = defineProps({
  mode: {
    type: String,
    default: 'list'
  },
  credential: {
    type: Object,
    required: true
  }
});

const selection = computed(() => {
  const {credentialDisplay: {registration: registrations}} = config;
  const map = new Map();
  for(const registration of registrations) {
    const {acceptableTypes, components} = registration;
    // loop through types so that map will consist of an object
    // containing all registered types
    for(const type of acceptableTypes) {
      // if the type already exists in the map, merge it with the
      // new information
      const existing = map.get(type);
      if(existing) {
        const combined = extend({
          target: {}, source: [existing, components], deep: true
        });
        map.set(type, combined);
        continue;
      }
      map.set(type, components);
    }
  }
  const {mode, credential} = props;
  const {type = ''} = unref(credential);
  // work backwards to lookup type in mapping
  // use defaults if not found in mapping
  let options;
  let index = type.length - 1;
  while(!options) {
    if(index === -1) {
      return componentDefaults[mode];
    }
    const granularType = type[index];
    options = map.get(granularType)?.[mode];
    index--;
  }
  // TODO: Determine if there is a way to check which components are
  // globally registered. This would allow for the component
  // selection to walk through the options and select the first
  // available component for the type.
  const {component} = options[0];
  return component;
});

</script>

<style lang="scss" scoped>
</style>
