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

<script>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
const DEFAULT_ICONS = {
  fontawesome: {
    defaultImage: 'fas fa-check-square'
  },
  'material-icons': {
    defaultImage: 'check_box'
  }
};

export default {
  name: 'CredentialCardImage',
  props: {
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
  },
  data() {
    return {
      hasImageError: false
    };
  },
  computed: {
    showDefault() {
      return !this.src;
    },
    defaultImage() {
      return this.$q.iconSet.credentialCard.defaultImage;
    },
    credentialImageClass() {
      return [`credential-card-image-${this.size}`];
    }
  },
  beforeCreate() {
    // set default icons
    const defaultIcons = DEFAULT_ICONS[this.$q.iconSet.name] ||
      DEFAULT_ICONS.fontawesome;
    // if the iconSet is missing credentialCard add it
    if(!this.$q.iconSet.credentialCard) {
      this.$q.iconSet.credentialCard = {};
    }
    // add all the defaultIcons to credentialCard
    for(const name in defaultIcons) {
      if(!this.$q.iconSet.credentialCard[name]) {
        this.$q.iconSet.credentialCard[name] = defaultIcons[name];
      }
    }
  },
  methods: {
    imageError() {
      this.hasImageError = true;
    }
  }
};
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
