<template>
  <div v-if="show">
    <q-item class="q-pa-none">
      <q-item-section>
        <template
          v-for="field of fields"
          :key="field.name">
          <q-item-label
            v-if="field.text"
            :class="[`cf-${field.name}`, field.class]"
            :style="{maxWidth: maxWidth}"
            :lines="lines">
            {{field.text}}
          </q-item-label>
        </template>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2026 Digital Bazaar, Inc.
 */
import {computed, defineProps} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: 'text-caption text-grey-7'
  },
  valueClass: {
    type: String,
    default: 'text-body2'
  },
  lines: {
    type: String,
    default: '1'
  },
  maxWidth: {
    type: String,
    default: '225px'
  },
  titleFirst: {
    type: Boolean,
    default: false
  }
});

const show = computed(() => props.value.length > 0);
const fields = computed(() => {
  const title = {name: 'title', text: props.title, class: props.titleClass};
  const value = {name: 'value', text: props.value, class: props.valueClass};
  return props.titleFirst ? [title, value] : [value, title];
});
</script>

<style lang="scss" scoped>
</style>
