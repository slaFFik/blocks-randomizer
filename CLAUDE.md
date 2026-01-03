# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Sacrifice grammar in your non-code replies for the sake of concision.

## Project Overview

**Blocks Randomizer** is a WordPress Gutenberg block plugin that displays a randomly selected child block from a container on the front-end.

## Commands

### Development
- `npm start` - Start development build with watch mode (includes PHP copying and blocks manifest generation)
- `npm run build` - Production build (includes PHP copying and blocks manifest generation)

### Code Quality
- `npm run format` - Format code using WordPress standards
- `npm run lint:css` - Lint SCSS files
- `npm run lint:js` - Lint JavaScript files

### Distribution
- `npm run plugin-zip` - Create deployable plugin ZIP file

### Dependencies
- `npm run packages-update` - Update WordPress script packages

## Architecture

### Block Structure

This plugin uses WordPress 6.7+ block type registration with `blocks-manifest.php` for improved performance:

- **Main plugin file** (`blocks-randomizer.php`): Registers blocks using modern WordPress APIs with backward compatibility fallbacks for WP 6.7+
- **Block source** (`src/blocks-randomizer/`): Contains all block assets that get compiled to `build/`
- **Block name**: `blocks-randomizer/holder`

### Key Components

1. **Editor (edit.js)**: Container block that accepts any child blocks using `useInnerBlocksProps`
   - No block restrictions (allows all block types)
   - Minimal UI with placeholder paragraph template
   - InspectorControls panel for display settings (number of items, shuffle toggle)

2. **Server-side rendering (render.php)**: Core randomization logic
   - Uses `$block->inner_blocks` to access children
   - Randomizes using `array_rand()`
   - Supports displaying N random blocks
   - Optional shuffle of selected blocks
   - Renders selected blocks using `$random_block->render()`
   - Note: Has `phpcs:ignore` for output escaping (intentional, as blocks handle their own escaping)

3. **Block metadata (block.json)**:
   - API Version 3
   - Category: widgets
   - Server-side rendered via `render.php`
   - Attributes: `numberOfItems` (number), `shuffle` (boolean)
   - Includes editor script, styles, and view script

### Build System

Uses `@wordpress/scripts` with custom flags:
- `--webpack-copy-php` - Copies PHP files to build directory
- `--blocks-manifest` - Generates `blocks-manifest.php` for efficient block registration

### Current Implementation

**Core features**:
- Display N randomly selected child blocks on front-end render
- Optional shuffle of selected blocks
- Manual addition of any block types as children
- Simple randomization on each page load
- Server-side rendering (cache-friendly)

**What's NOT yet implemented** (from PLAN.md):
- Weights (basic 1-5 or advanced)
- Anti-repetition logic
- Targeting rules (device, date, login state, etc.)
- Advanced layouts
- Analytics/impressions tracking

## WordPress Requirements

- **Minimum WP version**: 6.7 (uses blocks manifest registration)
- **Minimum PHP version**: 7.4
- **Tested up to**: WordPress 6.9

## Development Notes

### When extending functionality

1. **Block attributes**: Add to `block.json` and update `edit.js` to use via `attributes` prop
2. **Inspector controls**: Extend the `InspectorControls` component in `edit.js`
3. **Randomization logic**: Modify `render.php` (all front-end display logic is server-side)
4. **Styles**:
   - `editor.scss` for editor-only styles
   - `style.scss` for front-end and editor styles

### Compatibility considerations

The plugin uses modern WordPress block registration APIs with fallbacks:
- First tries `wp_register_block_types_from_metadata_collection()` (WP 6.8+)
- Falls back to `wp_register_block_metadata_collection()` + `register_block_type()` (WP 6.7)
- Always requires the `blocks-manifest.php` file
