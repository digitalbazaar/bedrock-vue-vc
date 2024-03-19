<template>
  <div
    class="full-height"
    :class="clickable && 'cb-clickable cursor-pointer'"
    @click="clickable && toggleDetails()">
    <div class="column full-height">
      <slot name="image">
        <dynamic-image
          class="q-ml-auto"
          :src="imageOverride.length > 0 ? imageOverride : credentialImage"
          :size="dense ? 'sm' : 'md'" />
      </slot>
      <slot name="description">
        <credential-field
          class="col flex items-end"
          :title="nameOverride.length > 0 ? nameOverride : credentialName"
          :title-class="`text-left ${dense ? 'text-body2':'text-body1'}`"
          :value="descriptionOverride.length > 0 ?
            descriptionOverride : description"
          :value-class="`text-left text-grey-7
            ${dense ? ' text-caption':' text-body2'}`" />
      </slot>
    </div>
    <q-dialog v-model="state.details">
      <slot name="modal">
        <q-card>
          <slot name="modalHeader" />
          <slot name="modalContent">
            <credential-switch
              v-bind="$attrs"
              mode="details"
              :credential="credential" />
          </slot>
          <slot name="modalFooter" />
        </q-card>
      </slot>
    </q-dialog>
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {computed, defineProps, reactive, toRef, unref} from 'vue';
import CredentialField from './CredentialField.vue';
import CredentialSwitch from './CredentialSwitch.vue';
import DynamicImage from './DynamicImage.vue';
import {useCredentialCommon} from './credentialCommon.js';

const props = defineProps({
  credential: {
    type: Object,
    required: true
  },
  dense: {
    type: Boolean,
    default: false
  },
  separator: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: false
  },
  expandable: {
    type: Boolean,
    default: false
  },
  detailsText: {
    type: String,
    default: 'Show Details'
  },
  detailsIcon: {
    type: String,
    default: 'far fa-window-restore'
  },
  imageOverride: {
    type: String,
    default: ''
  },
  nameOverride: {
    type: String,
    default: ''
  },
  descriptionOverride: {
    type: String,
    default: ''
  }
});

const state = reactive({
  details: false
});

const {
  credentialDescription, credentialName,
  credentialImage
} = useCredentialCommon({
  credential: toRef(props, 'credential')
});

const description = computed(() => {
  const _cd = unref(credentialDescription);
  if(_cd.length === 0) {
    return 'No description available.';
  }
  return _cd;
});

function toggleDetails() {
  state.details = !state.details;
}
</script>

<style lang="scss" scoped>
.cb-expandable :deep(.q-item__section--avatar) {
  min-width: unset;
}
</style>
