# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2026-06-08

### Changed

- `defaultRoll` prop default is now `6` (was `4`), matching the documented default.
  Consumers who relied on the undocumented `4` default will see the initial face change.
- SCSS toolchain migrated from the deprecated `node-sass` to Dart `sass` (`sass` package).
  Build-time only — no change to the published `dist/` output for consumers.
- Removed `react-dom` from `peerDependencies`; the library never imports it directly.

### Fixed

- Reducing `numDice` no longer breaks `rollAll` or the `rollDone` callback. Stale refs
  left over from a higher die count are now truncated before each roll so the completion
  counter reaches zero correctly.
- `sides > 6` no longer freezes the die. Roll values are clamped to `1–6` (the range
  supported by the CSS animation classes) so an out-of-range result can never lock up
  the component.
- `defaultRoll` and preset values passed to `rollDie` are clamped to `1 ≤ v ≤ 6`,
  preventing an unrenderable initial face.
- `dotColor` default corrected from `#1dff00` to `#1eff00`, matching the documented value.
- The `setTimeout` inside `rollDie` is now cleared on unmount, preventing a `setState`
  call on an unmounted component when a roll is in flight.
- Removed unused `totalValue` and `diceValues` state from `DiceContainer`; values were
  already delivered via the `totalCb`/`rollDone` callback and the state was causing
  unnecessary re-renders.
- `onRollDone` is now wrapped in `useCallback` so the `useMemo` that builds the dice
  array has a stable dependency and does not rebuild on every render.

### Accessibility

- Individual dice are now keyboard-activatable. When `disableIndividual` is `false`, the
  die container renders with `role="button"` and `tabIndex={0}`, and responds to Enter
  and Space key presses — matching standard interactive-widget semantics.

### Docs

- Fixed typo `disabbleRandom` → `disableRandom` in the options table.
- `rollDone` callback type corrected from `{String/Function}` to `{Function}`.
- Added missing `sides` prop to the options table.

## [2.2.0] - 2023-06-12

- Auto-roll bugfix and minor tweaks.

## [2.1.0] - 2023-03-21

- Dependency updates and build improvements.
