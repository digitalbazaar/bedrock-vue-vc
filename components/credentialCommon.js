/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import {computed, unref} from 'vue';

/**
 * Common utilities for credential components.
 *
 * @param {object} options - The options to use.
 * @param {*} options.credential - A vue ref to the credential.
 * @returns {object} An object containing common credential utilities.
 */
export function useCredentialCommon({credential}) {
  const credentialName = computed(() => {
    const {name = '', type = ['Verifiable Credential']} = unref(credential);
    if(name.length > 0) {
      return name;
    }
    const granularType = type[type.length - 1];
    // Replace any uppercase letter `[A-Z]` or any sequence of digits `\d+`
    // with a space plus what was just matched ` $1`. Skip the first
    // letter so that no space will be added at the beginning of the
    // resulting string by adding a negative lookahead on the start of the
    // string (?!^). 'SomeTestCredential300' -> 'Some Test Credential 300'
    return granularType.replace(/(?!^)([A-Z]|\d+)/g, ' $1');
  });

  const credentialImage = computed(() => {
    const {image = null, issuer} = unref(credential);
    return image ?? issuer?.image ?? issuer?.logo ?? '';
  });

  const issuerName = computed(() => {
    const {issuer} = unref(credential);
    return issuer?.name ?? '';
  });

  const credentialDescription = computed(() => {
    const {description = ''} = unref(credential);
    return description;
  });

  return {
    credentialName,
    credentialImage,
    credentialDescription,
    issuerName
  };
}
