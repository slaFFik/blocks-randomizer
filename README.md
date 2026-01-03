![Content Randomizer - Rotate Any Block](https://ps.w.org/blocks-randomizer/assets/banner-1544x500.png)

A WordPress Gutenberg block plugin that displays randomly selected child blocks on every page load. Perfect for testimonials, CTAs, and dynamic content rotation.

## Features

- **Universal Block Support** - Works with any Gutenberg block (core, custom, third-party)
- **Multiple Display Options** - Show one or multiple random blocks at once
- **Shuffle Control** - Optional randomization of display order
- **Server-Side Rendering** - Cache-friendly, SEO-friendly randomization
- **Zero Configuration** - Simple drag-and-drop interface, no coding required

## Use Cases

- Rotating testimonials and customer reviews
- A/B testing CTAs and promotional messages
- Random product showcases (WooCommerce compatible)
- Banner and advertisement rotation
- Daily tips, quotes, and educational content
- Team member spotlights

## Development

### Requirements

- WordPress 6.7+
- PHP 7.4+
- Node.js & npm

### Setup

```bash
# Install dependencies as per the package-lock.json file
npm ci

# Start development build (watch mode)
npm start

# Production build
npm run build

# Create plugin ZIP for distribution
npm run plugin-zip
```

### Code Quality

```bash
# Format code (WordPress standards)
npm run format

# Lint JavaScript
npm run lint:js

# Lint CSS/SCSS
npm run lint:css
```

## Architecture

- **Block Registration**: Uses WordPress 6.7+ blocks manifest (`blocks-manifest.php`) for improved performance
- **Editor Component**: Container block using `useInnerBlocksProps` with no child restrictions
- **Rendering**: Server-side randomization in `render.php` using `$block->inner_blocks`
- **Build System**: `@wordpress/scripts` with custom flags (`--webpack-copy-php`, `--blocks-manifest`)

Key files:
- `blocks-randomizer.php` - Main plugin file with block registration
- `src/blocks-randomizer/` - Block source files
- `build/` - Compiled assets

## Contributing

Contributions are welcome! Here's how to get started:

### Reporting Issues

- Use the [GitHub Issues](../../issues) tracker
- Search existing issues before creating new ones
- Include WordPress version, PHP version, and reproduction steps
- Provide relevant error messages or screenshots

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Make your changes following WordPress coding standards
4. Run linting and formatting (`npm run format && npm run lint:js && npm run lint:css`)
5. Test thoroughly in a WordPress environment
6. Commit with clear, descriptive messages
7. Push to your fork and submit a pull request

### Development Guidelines

- Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- Maintain backward compatibility with WordPress 6.7+
- Add comments for complex logic
- Update readme.txt changelog for user-facing changes
- Test with popular caching plugins and block themes

### Areas for Contribution

- Performance optimizations
- Accessibility improvements
- Unit and integration tests
- Documentation enhancements
- Internationalization (i18n) improvements
- Bug fixes and security patches

## License

GPL-2.0-or-later

## Links

- [WordPress.org Plugin Page](https://wordpress.org/plugins/blocks-randomizer/)
- [Support Forum](https://wordpress.org/support/plugin/blocks-randomizer/)
- [Author](https://github.com/slaFFik)
