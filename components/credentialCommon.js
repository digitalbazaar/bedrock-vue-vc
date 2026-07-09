/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import {computed, unref} from 'vue';
import {resolveCredentialDefinitionField} from './credentialDefinitions.js';

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
    const cred = unref(credential);
    const {image = null, issuer} = cred;
    // fall back to a vocabulary-specific image (e.g. OBv3's
    // `credentialSubject.achievement.image`) when no top-level image is
    // set; the resolved value may itself be a string URL or an image
    // object (`.id` holds the URL), per the OBv3 vocabulary
    const definitionImage = resolveCredentialDefinitionField(
      {credential: cred, field: 'imagePointer'});
    const definitionImageUrl = definitionImage?.id ?? definitionImage ?? null;
    return image ?? definitionImageUrl ?? issuer?.image ?? issuer?.logo ?? '';
  });

  const issuerName = computed(() => {
    const {issuer} = unref(credential);
    return issuer?.name ?? '';
  });

  const credentialDescription = computed(() => {
    const cred = unref(credential);
    const {description = ''} = cred;
    // fall back to a vocabulary-specific description (e.g. OBv3's
    // `credentialSubject.achievement.description`) when no top-level
    // description is set. Use `||`, not `??`, so an explicit empty string
    // (not just a missing/undefined field) also triggers the fallback.
    const definitionDescription = resolveCredentialDefinitionField(
      {credential: cred, field: 'descriptionPointer'});
    return description || definitionDescription || '';
  });

  return {
    credentialName,
    credentialImage,
    credentialDescription,
    issuerName
  };
}
