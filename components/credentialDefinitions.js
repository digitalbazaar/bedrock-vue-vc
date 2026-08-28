/*!
 * Copyright (c) 2026 Digital Bazaar, Inc. All rights reserved.
 */
/**
 * Generic, vocabulary-specific fallbacks for credential fields the core
 * VCDM does not define a fixed location for (e.g. `image`, `description`).
 * Each definition matches a credential via a map of JSON Pointer (RFC 6901)
 * => expected value, and supplies JSON Pointers to resolve for fields it
 * covers. A pointer whose target value is an array (e.g. `/type`) matches
 * if the array includes the expected value.
 *
 * Matching on `/type` rather than `/@context` avoids breaking on
 * vocabularies (like Open Badges) that mint a new context URL per minor
 * version -- `type` values are stable across those.
 */
export const credentialDefinitions = [
  {
    // Open Badges v3 (OBv3) `OpenBadgeCredential`s.
    matches: {
      '/type': 'OpenBadgeCredential'
    },
    imagePointer: '/credentialSubject/achievement/image',
    descriptionPointer: '/credentialSubject/achievement/description'
  }
];

/**
 * Resolves a JSON Pointer (RFC 6901) against a value.
 *
 * @param {object} options - The options to use.
 * @param {*} options.value - The value to resolve the pointer against.
 * @param {string} [options.pointer] - The JSON Pointer to resolve.
 *
 * @returns {*} The resolved value, or `undefined` if the pointer is unset
 *   or any segment is missing.
 */
export function getPointerValue({value, pointer}) {
  if(!pointer) {
    return undefined;
  }
  const segments = pointer.split('/').slice(1).map(
    segment => segment.replace(/~1/g, '/').replace(/~0/g, '~'));
  return segments.reduce((target, segment) => target?.[segment], value);
}

function _matchesDefinition({credential, matches}) {
  return Object.entries(matches).every(([pointer, expected]) => {
    const target = getPointerValue({value: credential, pointer});
    return Array.isArray(target) ?
      target.includes(expected) : target === expected;
  });
}

/**
 * Finds the first credential definition matching `credential` and resolves
 * the JSON Pointer named by `field` (e.g. `imagePointer`,
 * `descriptionPointer`) against it.
 *
 * @param {object} options - The options to use.
 * @param {object} options.credential - The credential to resolve a
 *   fallback value for.
 * @param {string} options.field - The definition field naming the JSON
 *   Pointer to resolve.
 *
 * @returns {*} The resolved value, or `undefined` if no definition
 *   matches, or the matched definition does not set `field`.
 */
export function resolveCredentialDefinitionField({credential, field}) {
  const definition = credentialDefinitions.find(
    ({matches}) => _matchesDefinition({credential, matches}));
  return getPointerValue({value: credential, pointer: definition?.[field]});
}
