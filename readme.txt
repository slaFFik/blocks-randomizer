=== Content Randomizer - Rotate Any Block ===
Contributors: slaFFik
Tags: randomizer, rotation, gutenberg, dynamic-content, testimonials
Requires at least: 6.7
Requires PHP: 7.4
Tested up to: 6.9
Stable tag: 1.3.1
License: GPL-2.0-or-later

Rotate and display random content blocks on every page load. Perfect for testimonials, CTAs, and dynamic content. Works with any block type.

== Description ==

Blocks Randomizer adds dynamic variety to your website by randomly displaying blocks from a collection you define. Simply add the "Blocks Randomizer" container block to any page or post, fill it with your desired content blocks, and the plugin will automatically select and display one (or more) randomly each time the page loads.

Perfect for creating fresh, engaging experiences for repeat visitors without manually updating content.

### Key Features

* **Easy to Use**: Works seamlessly with the WordPress Block Editor (Gutenberg)
* **Flexible Content**: Add any type of block as a child - paragraphs, images, headings, galleries, custom blocks, and more
* **Multiple Display Options**: Choose how many random blocks to show at once
* **No Coding Required**: Simple drag-and-drop interface for managing randomized content
* **Performance Optimized**: Lightweight and efficient randomization

### Use Cases

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

### How It Works

1. Add the "Blocks Randomizer" block to your page or post
2. Insert any blocks you want as direct children (top-level blocks will be picked during the randomization logic)
3. Configure how many blocks to display at once (optional)
4. Publish your page - visitors will see random content from your collection
5. Update anytime by adding, removing, or editing child blocks

### Using with the Block Editor (Gutenberg)

The Blocks Randomizer is built natively for the WordPress Block Editor (Gutenberg). It works as a container block that accepts any other blocks as children:

- **Full compatibility** with all core WordPress blocks (Paragraph, Image, Heading, Gallery, Button, Quote, etc.)
- **Drag-and-drop interface** for easy block management within the randomizer
- **Live preview** in the editor showing all your blocks (actual randomization happens on the front-end)
- **Block toolbar** and settings work normally for blocks inside the randomizer

Simply add the Blocks Randomizer block anywhere you'd add any other block, and start building your randomized content collection.

### Perfect For

* Marketing and landing pages
* Membership and community sites
* Educational and training platforms
* E-commerce and business websites
* Blogs and content sites
* Portfolio and agency websites

Whether you're looking to increase engagement, test different messaging, or simply add variety to your content, Blocks Randomizer makes it simple and intuitive.

## How to Create Rotating Testimonials

Creating rotating customer testimonials is one of the most popular uses for the Blocks Randomizer. Here's a step-by-step guide:

1. **Create or edit the page** where you want testimonials to appear (typically your homepage, services page, or dedicated testimonials page)
2. **Add the Blocks Randomizer block** by clicking the "+" button and searching for "Blocks Randomizer" or typing `/random`
3. **Add your first testimonial** inside the randomizer container - you can use Quote blocks, Paragraph blocks, or custom testimonial blocks from your theme
4. **Format your testimonial** with the customer's quote, name, company, and optionally add their photo using an Image block
5. **Add more testimonials** by clicking the "+" button inside the randomizer and repeating the formatting for each customer review
6. **Adjust display settings** (optional) - in the block sidebar, you can set how many testimonials to show at once if you want to display multiple reviews
7. **Publish or update** your page - visitors will now see a different random testimonial each time they load the page

**Pro tip:** Use consistent formatting for all testimonials (same heading sizes, image dimensions, text styles) to ensure smooth visual transitions between random selections.

## How to Set Up Random Call-to-Actions

Rotating different call-to-action messages helps you test which messaging resonates best with your audience:

1. **Open the page** where you want rotating CTAs (homepage, landing page, or product page)
2. **Add the Blocks Randomizer block** in the section where you want your CTA to appear
3. **Create your first CTA** using Button blocks, Heading + Paragraph combinations, or custom CTA blocks from your theme or page builder
4. **Duplicate and modify** - create variations with different:
   - Headline text ("Start Your Free Trial" vs "Get Started Today")
   - Button colors and styles
   - Supporting copy and benefits messaging
   - Urgency elements ("Limited Time Offer" vs "No Credit Card Required")
5. **Add each variation** as a separate block group inside the randomizer
6. **Set to display one CTA** at a time using the "Number of blocks" setting (set to 1)
7. **Monitor performance** over time to see which messages drive more conversions

**Pro tip:** Keep the overall design structure similar across variations so the page layout remains consistent, but vary the messaging and emphasis to test different value propositions.

**Pro tip 2:** You can use different UTM values (specifically, `utm_content`) for your CTA buttons inside the randomizer, this way you can even track using any analytics solution (like Google Analytics, or Fathom Analytics, or Plausible Analytics) which CTA performs better.

## How to Display Random Products

For e-commerce sites, rotating product showcases give equal visibility to your catalog:

1. **Navigate to your homepage** or shop page in the Block Editor
2. **Add the Blocks Randomizer block** where you want featured products to rotate
3. **Insert WooCommerce or Easy Digital Downloads product blocks** inside the randomizer - you can use:
   - Single Product blocks (for individual product showcases)
   - Products by Category blocks (for category spotlights)
   - Hand-picked Products blocks (for curated selections)
4. **Configure each product block** with your desired layout, show/hide settings for price, ratings, "add to cart" button, etc.
5. **Add multiple product configurations** - create different product spotlights, categories, or seasonal collections
6. **Adjust how many products** to display using the randomizer settings
7. **Publish your page** - products will rotate automatically, giving fair exposure to different items

**Pro tip:** Group related products together or create themed product blocks (e.g., "Summer Collection," "Best Sellers," "New Arrivals") for more cohesive random displays.

## How to Rotate Banner Advertisements

If you display ads, partner logos, or promotional banners, the randomizer helps distribute visibility:

1. **Prepare your banner images** - ensure they're all the same dimensions for a consistent layout
2. **Add the Blocks Randomizer block** to your sidebar, header, or content area where banners should appear
3. **Insert Image blocks** inside the randomizer, uploading each banner or advertisement
4. **Add links to each image** by selecting the image and clicking the link icon - set destinations for each ad
5. **Include alt text** for accessibility and SEO on each image
6. **Add multiple banners** - upload all your advertisement images or promotional graphics
7. **Set display quantity** based on your layout (1 for single banner rotation, multiple for ad grids)
8. **Publish and monitor** - banners will rotate fairly, ensuring all advertisers or promotions get equal exposure

**Pro tip:** Use the same aspect ratio for all banners to prevent layout shifts. Consider adding a Text block below images for additional context or disclaimers if needed.

## How to Configure Block Display Settings

Fine-tuning how many random blocks appear gives you precise control over your content:

1. **Select the Blocks Randomizer block** by clicking on it in the editor
2. **Open the Settings sidebar** on the right side of the screen (if not visible, click the gear icon in the top-right)
3. **Find the "Number of blocks" setting** in the block settings panel
4. **Adjust the number** using the input field or arrows:
   - Set to **1** for single random block display (great for hero sections, testimonials)
   - Set to **2-3** for multiple testimonials or product showcases
   - Set to **0** to hide the entire block on the front-end (useful for temporarily disabling without deleting content)
5. **Preview changes** by viewing the page on the front-end or using the editor preview
6. **Consider your layout** - ensure multiple random blocks fit well within your design at different screen sizes

**Pro tip:** The number you set is the maximum that will display. If you have fewer blocks inside the randomizer than the number specified, all available blocks will show.

### Using with WooCommerce or Easy Digital Downloads

Perfect for e-commerce sites looking to rotate products, promotions, and calls-to-action:

- **Product blocks** - Add Single Product, Products by Category, or Hand-picked Products blocks inside the randomizer
- **Product rotations** - Showcase different products on your homepage or shop sidebar
- **Promotional banners** - Rotate sale announcements and special offers
- **Category spotlights** - Give equal visibility to different product categories
- **Cross-sells and upsells** - Randomize product recommendations on product pages

**Example use case:** Add and configure a grid block on your homepage, then add a randomizer inside of it, then add 5-10 featured products to the randomizer, set it to display 3 at a time, and visitors will see a different product selection on each visit.

### Using with Caching Plugins

Understanding how caching affects randomization is crucial:

**WP Rocket:**
- Random blocks work with WP Rocket's page caching
- Content randomizes when cache regenerates (based on cache lifespan)
- For per-visit randomization, add pages to cache exclusions
- Consider using shorter cache lifespans for dynamic pages

**W3 Total Cache:**
- Compatible with page and object caching
- Random selection happens during cache generation
- Configure cache expiration based on how often you want new random content
- Use fragment caching to cache everything except the randomizer

**WP Super Cache:**
- Works with WP Super Cache out of the box
- Each cache refresh will select new random blocks
- Set appropriate cache timeout for your content rotation needs

**LiteSpeed Cache:**
- Fully compatible with LiteSpeed caching
- Random blocks cached until cache expires
- Use ESI (Edge Side Includes) for more dynamic behavior if needed

**Cloudflare / CDN:**
- CDN caching will serve the same version to all users until cache expires
- Configure page rules for pages with randomized content
- Consider shorter TTL (Time To Live) for dynamic pages

**Key principle:** The Blocks Randomizer performs server-side randomization. Whatever is selected gets cached. New random selection happens when cache regenerates.

### Using with SEO Plugins

The Blocks Randomizer is SEO-friendly since randomization happens server-side.

**SEO best practices:**
- Don't place critical, unchanging SEO content in the randomizer
- Use the randomizer for supplementary elements (testimonials, CTAs, featured items)
- All variations should be topically relevant to the page's main purpose
- Consider that search engines may index different random variations on different crawls

### Using with Form Plugins

Randomize different contact forms or lead capture forms to determine which one performs better - collects more contacts or leads.

**WPForms:**
- Insert WPForms blocks inside the randomizer
- A/B test different form designs
- Rotate forms for different services or products

**Contact Form 7:**
- Add Contact Form 7 blocks to the randomizer
- Test different form layouts and field combinations
- Rotate forms for different audiences or purposes

**Gravity Forms:**
- Add Gravity Forms blocks to random rotation
- Test form conversion rates with different layouts
- Display appropriate forms based on random selection

**Formidable Forms:**
- Compatible with Formidable Forms blocks
- Randomize contact forms, surveys, or calculators

### Using with Membership & LMS Plugins

Display dynamic content for members or students:

**LearnDash:**
- Randomize course highlights or lesson previews
- Rotate student testimonials
- Display random course modules or topics

**MemberPress:**
- Rotate membership benefits or pricing tables
- Randomize member testimonials
- Display different membership tier highlights

**LifterLMS:**
- Randomize course showcases
- Rotate instructor spotlights
- Display random learning paths

== Installation ==

This section describes how to install the plugin and get it working.

**Install through your backend**:

1. Install the plugin via Plugins -> New plugin. Search for "blocks randomizer".
1. Click the "Install Now" button, and then - "Activate".

**Install manually**:

1. Download and unzip the plugin.
1. Upload the `blocks-randomizer` directory to the `/wp-content/plugins/` directory.
1. Activate the plugin through the "Plugins" menu in WordPress.

**Next**:

Now you can use the plugin inside the Block Editor.

== Frequently Asked Questions ==

### How do I add the Blocks Randomizer to my page?

In the Block Editor, type the slash `/random` and select the "Blocks Randomizer" block. Then use the "+" button inside of it to add any blocks you want to be randomized on each page load.

### Can I randomize any type of block?

Yes, any block that you see in your Block Editor can be used inside our Blocks Randomizer.

### How many blocks can I add to the randomizer?

There are no limits on the number of inner blocks inside our Blocks or Content Randomizer plugin.

### Will this slow down my website?

No, the logic to pick a block is blazing fast and will not affect the page speed where the block is randomly selected and displayed.

### Does the block output anything on the front-end?

Only the randomly selected child (or inner) block inside the Block Randomizer container will be displayed on the front-end. There will be no extra <code>div</code> wrapper, no extra classes or ids.

### Why have you created the plugin?

I wanted to diversify content on my login page and display randomly some useful tips and pieces of content for my users.

### Does this work with custom blocks?

Absolutely! The Blocks Randomizer works with any block type - including custom blocks created by third-party plugins, theme-specific blocks, and blocks you've built yourself. As long as the block appears in your WordPress Block Editor, you can add it to the randomizer container and it will be included in the random rotation.

### Can I display multiple random blocks at once?

Yes, you can configure how many random blocks to display simultaneously using the "Number of blocks" setting in the block's sidebar panel. For example, if you have 10 testimonial blocks inside the randomizer, you can choose to display 3 random testimonials at once. Each page load will select a different random combination from your collection.

### Does the randomization work with caching plugins?

The Blocks Randomizer performs server-side randomization during page generation, which means it works seamlessly with most caching plugins. Each time your cache expires and the page regenerates, a new random selection will be cached. For sites with aggressive caching (where pages are cached for extended periods), you may see the same blocks until the cache refreshes. For truly dynamic randomization on every single page view, you may need to configure cache exclusions for specific pages.

### Can I use this for A/B testing different messages?

Yes! The Blocks Randomizer is perfect for simple A/B testing scenarios. Create different versions of your content (headlines, call-to-action buttons, promotional messages) as separate blocks within the randomizer, and the plugin will rotate through them automatically. While this doesn't provide analytics tracking like dedicated A/B testing tools, it's an excellent way to give equal exposure to different messaging variations and see which resonates better with your audience over time.

### Does this work with WooCommerce product blocks?

Yes, the Blocks Randomizer is fully compatible with WooCommerce product blocks. You can create a collection of product blocks, featured product showcases, or promotional banners and rotate them randomly on your shop pages, homepage, or anywhere else on your site. This is great for giving equal visibility to different products or testing various product presentation styles.

### Will random blocks affect my SEO?

Search engine crawlers will see whatever content is randomly selected when they visit your page. Since the randomization happens server-side, the content is fully rendered in the HTML and is indexable by search engines. However, keep in mind that different crawl sessions may see different content blocks. For critical SEO content that must be consistently visible, we recommend not placing it inside the randomizer. Use the randomizer for supplementary content like testimonials, CTAs, or promotional elements.

### Can I use shortcodes with the Blocks Randomizer?

The Blocks Randomizer is a native WordPress block designed for the Block Editor (Gutenberg). It doesn't provide a shortcode interface for use in classic editor widgets or sidebars. However, you can use the randomizer in any block-enabled area, including widget areas that support blocks, Full Site Editing templates, and reusable block patterns. For classic widget areas, consider enabling block-based widgets in your theme settings. You can also use the "Shortcode" block inside the "Block Randomizer" block.

== Screenshots ==

1. Adding the Random Content Block to your page using the WordPress block editor
1. Block settings panel showing options to control how many random blocks display at once
1. Front-end display of randomly selected blocks with custom styling.

== Changelog ==

= 1.4.0 =
* Added: New cookie-based repeat prevention to ensure random blocks remain consistent across page loads within the same user session.

= 1.3.1 =
* Changed: The plugin is fully compatible with WordPress 6.9.
* Fixed: General code cleanup and improvements.

= 1.3.0 =
* Added: New "Shuffle" option to randomize the order of randomly selected blocks. Enabled and works only if there is more than 1 block to display.

= 1.2.1 =
* Fixed: In the Block Editor the white background of the Block Randomizer inner container is no longer set - so users of dark themes can actually see the text inside the randomizer while editing the block.

= 1.2.0 =
* Changed: You can now set the number of items inside the randomizer block to 0, effectively hiding the whole block on the front-end (and everything inside it).
* Changed: Do not allow putting the Randomizer block inside the Randomizer block. You don't want to go deeper.

= 1.1.0 =
* Added: New option - Number of child blocks to display.

= 1.0.0 =
* Added: New parent container to store all your randomly selected blocks: Blocks Randomizer
