# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Sacrifice grammar in your non-code replies for the sake of concision.

## Development Site

Locally, the site being developed on is `https://blocks.test`, where the login and password are both `admin`.

The plugin is installed and activated in this environment, and all development and testing should be done here.

## Project Overview

**Blocks Randomizer** is a WordPress Gutenberg block plugin that displays randomly selected child blocks from a container on the front-end. Single block named `blocks-randomizer/holder`.

## Commands

- `npm ci` - Install dependencies (use `ci`, not `install`, for reproducible builds)
- `npm start` - Dev build with watch mode
- `npm run build` - Production build (required before `plugin-zip`)
- `npm run format` - Format code (WordPress standards)
- `npm run lint:js` - Lint JavaScript
- `npm run lint:css` - Lint SCSS
- `npm run plugin-zip` - Create deployable ZIP
- `npm run packages-update` - Update WordPress script packages

No test suite exists. Manual testing in a WordPress 6.7+ environment required. Node.js 20 (see `.nvmrc`).

## Architecture

### Data Flow

Editor (`edit.js`) → user adds child blocks → saved as inner blocks → server-side `render.php` picks random subset → outputs rendered HTML.

All front-end logic is in `render.php`. The `view.js` file exists but is empty (SSR handles everything).

### Key Files

| Task | Files to modify |
|------|----------------|
| Front-end behavior / randomization | `src/blocks-randomizer/render.php` |
| Editor UI / inspector controls | `src/blocks-randomizer/edit.js` |
| Block attributes | `src/blocks-randomizer/block.json` + `edit.js` |
| Editor-only styles | `src/blocks-randomizer/editor.scss` |
| Front-end + editor styles | `src/blocks-randomizer/style.scss` |
| Block registration | `src/blocks-randomizer/index.js` |
| Plugin metadata / version | `blocks-randomizer.php` + `readme.txt` |

### Block Attributes (block.json)

- `numberOfItems` (number, default 1) — how many random child blocks to display
- `shuffle` (boolean, default false) — randomize order of selected blocks
- `preventRepeatsUsingSession` (boolean, default false) — store selection in browser session cookie to keep same blocks until browser closes

### Build System

Uses `@wordpress/scripts` with flags: `--webpack-copy-php` (copies PHP to build/) and `--blocks-manifest` (generates `blocks-manifest.php`). The `build/` directory is gitignored.

### Block Registration (blocks-randomizer.php)

Tiered fallback for WP compat:
1. `wp_register_block_types_from_metadata_collection()` (WP 6.8+)
2. `wp_register_block_metadata_collection()` + `register_block_type()` (WP 6.7)

### render.php Details

- `phpcs:ignore` for output escaping is intentional — inner blocks handle their own escaping
- Session cookies use `br_ids_` prefix + md5 of inner blocks as cookie name
- Cookie stores comma-separated md5 hashes of selected block parsed_block data
- Caps at 100 blocks per cookie to avoid size limits

## Requirements

- **WordPress**: 6.7+ (6.8+ for best performance)
- **PHP**: 7.4+
- **Node.js**: 20

## Roadmap

See `PLAN.md` for the full feature roadmap (Free/Pro tiers). Key unimplemented features: weights, targeting rules, advanced layouts, analytics.
