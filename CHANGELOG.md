# bedrock-vue-vc ChangeLog

## 5.1.0 - 2026-mm-dd

### Added
- `components/credentialDefinitions.js`: a generic, JSON Pointer-based
  mechanism for vocabulary-specific credential field fallbacks (`image`,
  `description`, ...). A definition matches a credential by JSON Pointer
  value (array-membership when the target is an array, e.g. `/type`) and
  supplies pointers to resolve for fields the core VCDM leaves
  vocabulary-defined. Adding fallback support for a new vocabulary is a
  new entry in `credentialDefinitions`, not new conditional logic in a
  resolver.

### Fixed
- Resolve an Open Badges v3 (OBv3) achievement image
  (`credentialSubject.achievement.image`) as a fallback for
  `credentialImage` when no top-level credential image is present, so
  OBv3 `OpenBadgeCredential`s no longer show the generic checkbox
  placeholder icon. Resolved generically via `credentialDefinitions`
  rather than hardcoded in `credentialImage` itself.

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
