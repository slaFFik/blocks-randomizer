# Project Instructions

This is the canonical, model-agnostic guide for coding agents and development tools in this repository. `CLAUDE.md` must remain a symlink to this file. `.github/copilot-instructions.md` contains only Copilot-specific additions.

Keep non-code replies concise, even at the expense of perfect grammar.

## Fast Start

- This is a small WordPress block plugin with one block: `blocks-randomizer/holder`.
- Inspect `git status` before editing and preserve unrelated work.
- Edit source files under `src/`; never hand-edit generated `build/` files.
- Activate Node.js 24 from `.nvmrc`, then verify with `node --version` before running npm commands.
- Install dependencies with `npm ci` only when `node_modules` is absent or `package-lock.json` changed. `.npmrc` rejects packages published less than seven days ago.
- Run checks that match the changed files. There is no automated test suite, so behavior changes require manual WordPress testing.

## Compatibility and Local Runtime

- Minimum WordPress: 6.8. Tested up to: 7.1.
- Minimum PHP: 7.4. Keep PHP syntax and APIs compatible with PHP 7.4.
- Node.js: 24, defined by `.nvmrc`.
- Local site: `https://blocks.test`
- Local WordPress root: `../../..` relative to this plugin directory.
- Admin username and password: `admin` / `admin`.
- The plugin is installed and active on the local site. The local site currently runs WordPress 7.1.
- Run WP-CLI from the WordPress root, for example: `wp core version` or `wp plugin status blocks-randomizer`.
- The `blocks.test` site is not a WordPress Studio-managed site. Use the Studio CLI only for disposable fresh-install compatibility checks; run `studio create --help` before creating one and select the required WordPress/PHP versions explicitly.

## Architecture and Behavioral Invariants

Editor flow: `edit.js` accepts child blocks through `InnerBlocks`; `save.js` serializes those inner blocks; `render.php` selects and renders a subset on each uncached front-end request.

- The stable block name is `blocks-randomizer/holder`. Changing it is a content migration, not a routine rename.
- This is a dynamic block, but `save.js` still stores a wrapper and the inner-block markup. Save-markup changes can invalidate existing posts and need a deprecation or migration strategy plus save/reload testing.
- The block excludes itself from its allowed inner blocks to prevent direct self-nesting.
- There is no front-end JavaScript. `view.js` is empty and is not referenced by `block.json`; rendering is server-side.
- Randomization happens at render time. A full-page cache can preserve one rendered selection, so evaluate randomness with page caching bypassed.
- The plugin currently has no settings page, database tables, REST routes, AJAX handlers, cron jobs, or production npm dependencies.

### Block Attributes

- `numberOfItems` (number, default `1`): number of children to display. `0` renders nothing; a value at or above the child count renders all children.
- `shuffle` (boolean, default `false`): randomizes the order of the selected children when more than one is selected.
- `preventRepeatsUsingSession` (boolean, default `false`): stores selected child hashes in a session cookie so future requests avoid them until the available set is exhausted.

### Session Cookie Behavior

- Cookie names use the `br_ids_` prefix plus an MD5 hash of the encoded inner blocks.
- Values are comma-separated MD5 hashes of parsed child-block data.
- Cookies are session-only, `HttpOnly`, `SameSite=Lax`, secure on SSL, and scoped to `COOKIEPATH`.
- Stored IDs are capped at 100. Disabling repeat prevention clears the cookie.
- The `phpcs:ignore` on rendered inner-block output is intentional: each inner block owns its escaping.

## Source Map

| Concern | Source of truth |
| --- | --- |
| Plugin bootstrap and block registration | `blocks-randomizer.php` |
| Block metadata, attributes, supports | `src/blocks-randomizer/block.json` |
| Editor UI and inspector controls | `src/blocks-randomizer/edit.js` |
| Saved inner-block markup | `src/blocks-randomizer/save.js` |
| Front-end selection, rendering, cookies | `src/blocks-randomizer/render.php` |
| JavaScript registration and style imports | `src/blocks-randomizer/index.js` |
| Editor-only styles | `src/blocks-randomizer/editor.scss` |
| Front-end and editor styles | `src/blocks-randomizer/style.scss` |
| WordPress.org metadata and changelog | `readme.txt` |
| User-facing repository documentation | `README.md` |
| npm scripts and dependency versions | `package.json`, `package-lock.json` |

## Build and Validation

The build uses `@wordpress/scripts`; `--webpack-copy-php` copies PHP source and `--blocks-manifest` generates `build/blocks-manifest.php`. The `build/` directory and plugin ZIP are generated and gitignored.

| Command | Use |
| --- | --- |
| `npm start` | Watch development assets |
| `npm run build` | Generate a production build after source changes |
| `npm run lint:js` | Check JavaScript |
| `npm run lint:css` | Check SCSS |
| `php -l blocks-randomizer.php` | Check bootstrap PHP syntax |
| `php -l src/blocks-randomizer/render.php` | Check renderer PHP syntax |
| `npm run format` | Mutating formatter for `src/`; review its diff before keeping changes |
| `npm run plugin-zip` | Create a release ZIP after a successful build |
| `npm run packages-update` | Deliberately update WordPress packages; do not use during unrelated work |

Validation should be proportional to the change:

- Documentation or instruction-only: inspect the diff and verify referenced files, commands, and versions.
- JavaScript or metadata: production build and JavaScript lint.
- SCSS: production build and CSS lint.
- PHP: syntax-check every changed PHP file and exercise the affected front-end behavior.
- Block serialization: insert the block, add varied child blocks, save, reload the editor, and confirm there is no invalid-block warning.
- Rendering: cover `numberOfItems` values `0`, `1`, and greater than the child count; cover shuffle both ways.
- Repeat prevention: verify repeated uncached requests, cookie rollover after exhausting the set, session-cookie flags, and cookie removal after disabling the option.

If a repository-wide check fails in untouched code, report the exact failure and distinguish it from regressions introduced by the current changes.

## WordPress and Coding Constraints

- The plugin deliberately uses the WordPress 6.8+ `wp_register_block_types_from_metadata_collection()` API directly. Do not restore pre-6.8 compatibility workarounds.
- Follow WordPress PHP, JavaScript, CSS, accessibility, security, and internationalization conventions.
- Use `@wordpress/i18n` for user-facing JavaScript strings and the `blocks-randomizer` text domain.
- Preserve the `apiVersion: 3` block metadata unless a requested compatibility change requires otherwise.
- Before changing an identifier, public function signature, block name, attribute schema, or serialized markup, find all references and assess backward compatibility.
- Do not change dependencies, generated assets, workflows, release metadata, or unrelated formatting unless the task requires it.
- Never reference issue or ticket numbers in source comments; explain the underlying reason instead.

## Version and Release Synchronization

Do not bump versions unless requested. When preparing a release, keep these synchronized as applicable:

- Plugin version constant and header in `blocks-randomizer.php`
- `version` in `package.json` and the root package entry in `package-lock.json`
- `version` in `src/blocks-randomizer/block.json`
- `Stable tag`, compatibility headers, and changelog in `readme.txt`

The `1.5.0` changelog section is currently an unreleased section while runtime/package metadata remains `1.4.0`; do not infer that a release bump is authorized.

## Repository Safety

- Do not commit unless the user explicitly asks. Never push.
- Keep edits scoped and preserve uncommitted user changes.
- Do not make claims from this guide alone when a cheap source or runtime check can verify them. If code and instructions disagree, verify the current behavior and update the relevant instruction as part of the task.
