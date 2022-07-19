<template>
  <div
    class="row justify-center"
    :class="credentialImageClass">
    <q-icon
      v-if="showDefault || hasImageError"
      :name="defaultImage" />
    <img
      v-else
      :src="src"
      @error="imageError">
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {computed, ref} from 'vue';
import {useQuasar} from 'quasar';

const DEFAULT_ICONS = {
  fontawesome: {
    defaultImage: 'fas fa-check-square'
  },
  'material-icons': {
    defaultImage: 'check_box'
  }
};
const $q = useQuasar();

// set default icons
const defaultIcons = DEFAULT_ICONS[$q.iconSet.name] ||
  DEFAULT_ICONS.fontawesome;
// if the iconSet is missing credentialCard add it
if(!$q.iconSet.credentialCard) {
  $q.iconSet.credentialCard = {};
}
// add all the defaultIcons to credentialCard
for(const name in defaultIcons) {
  if(!$q.iconSet.credentialCard[name]) {
    $q.iconSet.credentialCard[name] = defaultIcons[name];
  }
}

const hasImageError = ref(false);
const props = defineProps({
  src: {
    type: String,
    required: true,
    default: ''
  },
  size: {
    type: String,
    required: true,
    default: 'md'
  }
});

const showDefault = computed(() => !props.src);
const defaultImage = computed(() => $q.iconSet.credentialCard.defaultImage);
const credentialImageClass = computed(
  () => [`credential-card-image-${props.size}`]);

function imageError() {
  hasImageError.value = true;
}
</script>

<style lang="scss" scoped>
$xs: 25px;
$sm: 50px;
$md: 75px;
$lg: 125px;
$xl: 150px;

.credential-card-image-xs {
  svg {
    width: $xs;
    height: $xs;
  }

  .q-icon {
    font-size: $xs;
  }

  img {
    width: $xs;
    height: $xs;
    border-radius: 4px;
  }
}
.credential-card-image-sm {
  svg {
    width: $sm;
    height: $sm;
  }

  .q-icon {
    font-size: $sm;
  }

  img {
    width: $sm;
    height: $sm;
    border-radius: 4px;
  }
}
.credential-card-image-md {
  svg {
    width: $md;
    height: $md;
  }

  .q-icon {
    font-size: $md;
  }

  img {
    width: $md;
    height: $md;
    border-radius: 4px;
  }
}
.credential-card-image-lg {
  svg {
    width: $lg;
    height: $lg;
  }

  .q-icon {
    font-size: $lg;
  }

  img {
    width: $lg;
    height: $lg;
    border-radius: 4px;
  }
}
.credential-card-image-xl {
  svg {
    width: $xl;
    height: $xl;
  }

  .q-icon {
    font-size: $xl;
  }

  img {
    width: $xl;
    height: $xl;
    border-radius: 4px;
  }
}
</style>
