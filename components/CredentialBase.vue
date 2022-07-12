<template>
  <div class="column justify-evenly">
    <div
      :class="dense ? 'q-py-none' : 'q-py-xs'"
      class="cb-content col row justify-between items-center">
      <slot name="description">
        <credential-field
          class="col"
          :title="nameOverride.length > 0 ? nameOverride : credentialName"
          title-class="text-left text-subtitle1"
          :value="descriptionOverride.length > 0 ?
            descriptionOverride : description"
          value-class="text-left text-body2 text-grey-7" />
      </slot>
      <slot name="image">
        <credential-card-image
          :src="imageOverride.length > 0 ? imageOverride : credentialImage"
          :size="dense ? 'sm' : 'md'" />
      </slot>
    </div>
    <q-separator
      v-if="(clickable || expandable) && separator"
      class="cb-separator" />
    <div
      :class="dense ? 'q-py-none' : 'q-py-xs'"
      class="col">
      <div
        v-if="clickable"
        class="cb-clickable cursor-pointer
        row items-center justify-center text-grey-7"
        @click="toggleDetails">
        <span class="cb-details-text q-mr-sm">{{detailsText}}</span>
        <q-icon :name="detailsIcon" />
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
      <div
        v-else-if="expandable"
        class="cb-expandable row justify-start text-grey-7 full-width">
        <q-expansion-item
          :label="detailsText"
          class="full-width"
          dense
          dense-toggle
          switch-toggle-side>
          <slot name="expansion">
            <slot name="expansionHeader" />
            <slot name="expansionContent">
              <credential-switch
                v-bind="$attrs"
                mode="details"
                :credential="credential" />
            </slot>
            <slot name="expansionFooter" />
          </slot>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import CredentialCardImage from './CredentialCardImage.vue';
import CredentialField from './CredentialField.vue';
import CredentialSwitch from './CredentialSwitch.vue';
import {computed, defineProps, reactive, toRef, unref} from 'vue';
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
  console.log(state.details);
  state.details = !state.details;
}

</script>

<style lang="scss" scoped>
.cb-expandable :deep(.q-item__section--avatar) {
  min-width: unset;
}
</style>
