<template>
  <div v-if="show">
    <q-item class="q-pa-none">
      <q-item-section>
        <q-item-label
          v-if="title"
          class="cf-title"
          style="max-width: 225px;"
          :class="titleClass"
          :lines="lines">
          {{title}}
        </q-item-label>
        <q-item-label
          class="cf-value"
          style="max-width: 225px;"
          :class="valueClass"
          :lines="lines">
          {{value}}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
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
  }
});

const show = computed(() => props.value.length > 0);
</script>

<style lang="scss" scoped>
</style>
