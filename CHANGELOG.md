# bedrock-vue-vc ChangeLog

## 6.0.0 - 2026-09-04

### Changed
- **BREAKING**: Require `@bedrock/quasar@11`, replacing `@bedrock/quasar@10`,
  in the peer dependency range. That release moves to `@bedrock/vue@6`; this
  package does not use `@bedrock/vue` itself, so no code changes are needed
  here. The existing `vue@^3.5.42` range already satisfies what
  `@bedrock/quasar@11` requires.

## 5.1.0 - 2026-09-03

### Added
- `components/credentialDefinitions.js`: a generic, JSON Pointer-based
  mechanism for vocabulary-specific credential field fallbacks (`image`,
  `description`, ...). A definition matches a credential by JSON Pointer
  value (array-membership when the target is an array, e.g. `/type`) and
  supplies pointers to resolve for fields the core VCDM leaves
  vocabulary-defined. Adding fallback support for a new vocabulary is a
  new entry in `credentialDefinitions`, not new conditional logic in a
  resolver.
- Add `maxWidth` prop to `CredentialField` and `CredentialBase`.

### Changed
- Update dev dependencies.
- Update peer dependencies.
  - `@bedrock/quasar@10.0.1`
  - `@bedrock/web@3.1.0`
  - `vue@3.5.42`
- Update test dependencies.

### Fixed
- Resolve an Open Badges v3 (OBv3) achievement image
  (`credentialSubject.achievement.image`) as a fallback for
  `credentialImage` when no top-level credential image is present, so
  OBv3 `OpenBadgeCredential`s no longer show the generic checkbox
  placeholder icon. Resolved generically via `credentialDefinitions`
  rather than hardcoded in `credentialImage` itself.
- Resolve an Open Badges v3 (OBv3) achievement description
  (`credentialSubject.achievement.description`) as a fallback for
  `credentialDescription` when no top-level credential description is
  present, so OBv3 `OpenBadgeCredential`s no longer show "No description
  available." when a real description exists on the achievement.
  Resolved generically via `credentialDefinitions`, same as the image
  fallback above.
- Clamp `CredentialBase.vue`'s title/description to 2 lines instead of
  hard-truncating to 1 line with an ellipsis, so more of a credential's
  description is visible in compact/list views before it needs to
  wrap or clip.

## 5.0.0 - 2024-04-01

### Added
- Customizable text color.

### Changed
- **BREAKING**: Change card layout.

## 4.0.0 - 2024-03-19

### Changed
- Change credential card UI to resemble a 3/2 wallet card.

## 3.0.0 - 2024-03-14

### Added
- Add quasar linting.

### Changed
- **BREAKING**: Update dependencies.
  - `@bedrock/quasar@10`.

## 2.1.0 - 2023-12-01

### Added
- Include default text when credential description is blank.

## 2.0.3 - 2023-11-01

### Fixed
- Allows non-square vc images to not distort.

## 2.0.2 - 2022-08-22

### Fixed
- Ensure components are exported.

## 2.0.1 - 2022-08-22

### Fixed
- Use `exports` in `package.json`.

## 2.0.0 - 2022-08-22

### Changed
- **BREAKING**: Update peer deps:
  - `@bedrock/quasar@9`
  - `@bedrock/vue@5`
  - `@bedrock/web@3`.

## 1.0.0 - 2022-07-20

- Initial release.
- See git history for changes.
