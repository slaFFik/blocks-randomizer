=== Blocks Randomizer ===
Contributors: slaFFik
Tags: content-block, random, randomize, rotation, spotlight
Requires at least: 6.7
Requires PHP: 7.4
Tested up to: 6.8
Stable tag: 1.1.0
License: GPL-2.0-or-later

Display randomly any of the top-level blocks within &quot;Blocks Randomizer&quot; main block.

== Description ==

Blocks Randomizer adds dynamic variety to your website by randomly displaying blocks from a collection you define. Simply add the "Blocks Randomizer" container block to any page or post, fill it with your desired content blocks, and the plugin will automatically select and display one (or more) randomly each time the page loads.

Perfect for creating fresh, engaging experiences for repeat visitors without manually updating content.

= Key Features =

* **Easy to Use**: Works seamlessly with the WordPress Block Editor (Gutenberg)
* **Flexible Content**: Add any type of block as a child - paragraphs, images, headings, galleries, custom blocks, and more
* **Multiple Display Options**: Choose how many random blocks to show at once
* **No Coding Required**: Simple drag-and-drop interface for managing randomized content
* **Performance Optimized**: Lightweight and efficient randomization

= Use Cases =

**Rotating Testimonials**
Create a collection of testimonial blocks and display a different customer review each time visitors load your page. Great for homepage hero sections or service pages.

**Daily Tips & Quotes**
Add multiple quote or paragraph blocks with tips, motivational quotes, or daily advice. Each page load presents fresh inspiration to your audience.

**Random Call-to-Actions**
Test different CTAs by randomly displaying various buttons, banners, or promotional blocks. Perfect for A/B testing messaging without complex tools.

**Product Showcases**
Rotate featured products, services, or portfolio items on your homepage to give equal visibility to different offerings.

**Educational Content**
Display random "Did You Know?" facts, learning tips, or course highlights to keep educational sites engaging for returning students.

**Banner & Advertisement Rotation**
Cycle through different promotional banners, partner logos, or advertisement blocks without needing a separate ad management plugin.

**Seasonal Greetings**
Add multiple greeting blocks for different occasions and let visitors see varied welcome messages throughout the year.

**Team Member Spotlights**
Showcase different team members randomly on your about page, giving everyone fair representation.

= How It Works =

1. Add the "Blocks Randomizer" block to your page or post
2. Insert any blocks you want as direct children (top-level blocks will be picked during the randomization logic)
3. Configure how many blocks to display at once (optional)
4. Publish your page - visitors will see random content from your collection
5. Update anytime by adding, removing, or editing child blocks

= Perfect For =

* Marketing and landing pages
* Membership and community sites
* Educational and training platforms
* E-commerce and business websites
* Blogs and content sites
* Portfolio and agency websites

Whether you're looking to increase engagement, test different messaging, or simply add variety to your content, Blocks Randomizer makes it simple and intuitive.

== Installation ==

This section describes how to install the plugin and get it working.

1. Upload `blocks-randomizer` to the `/wp-content/plugins/` directory.
1. Activate the plugin through the 'Plugins' menu in WordPress.
1. Go to the Block Editor and add your new "Blocks Randomizer" block, which is just a container.
1. Any to the top level any children blocks that you want to be randomized on display on the front-end.

== Screenshots ==

1. Adding a "Blocks Randomizer" block.
2. Various blocks all within the same container, that will be picked and displayed randomly.

== Changelog ==

= UNRELEASED =
* Changed: You can now set the number of items as 0, effectively hiding the whole block on the front-end.
* Changed: Do not allow putting the Randomizer block inside the Randomizer block. You don't want to go deeper.

= 1.1.0 =
* Added: New option - Number of child blocks to display.

= 1.0.0 =
* Added: New parent container to store all your randomly selected blocks: Blocks Randomizer
