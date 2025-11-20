# Thread - Customer Success Platform Website

A modern, responsive website for Thread, a Customer Success platform designed to help CCOs and VPs of Customer Success unlock predictable renewals and confident customer outcomes.

## Features

- **Hero Section** - Compelling headline with Account 360 dashboard preview
- **Executive Outcomes** - Five key business outcomes that matter to leadership
- **CS Performance** - Four workflow improvements for CSMs
- **Feature Pillars** - Four core features with business outcomes
- **Social Proof** - Customer testimonials and company logos
- **Integrations** - Technical integrations showcase
- **Long Form Explainer** - Detailed narrative for decision makers
- **Pricing** - Three-tier pricing structure
- **Footer CTAs** - Clear call-to-action buttons

## Getting Started

### Prerequisites

No build tools or dependencies required! This is a pure HTML, CSS, and JavaScript website.

### Installation

1. Clone or download this repository
2. Open `index.html` in a web browser

That's it! The website is ready to use.

### Local Development

For a better development experience, you can use a local server:

#### Using Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if installed)
```bash
npx http-server
```

#### Using PHP (if installed)
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
Thread/
├── index.html      # Main HTML file
├── styles.css      # All styling and responsive design
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## Customization

### Colors

The color scheme is defined in CSS variables at the top of `styles.css`:

```css
:root {
    --primary-color: #0066ff;
    --primary-dark: #0052cc;
    --secondary-color: #6c757d;
    /* ... more colors ... */
}
```

### Content

All content is in `index.html`. Simply edit the HTML to update:
- Headlines and subheadlines
- Feature descriptions
- Testimonials
- Pricing tiers
- Footer information

### Styling

All styles are in `styles.css`. The design is fully responsive and includes:
- Mobile-first approach
- Smooth animations
- Modern UI components
- Professional typography (Inter font)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Implemented

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth scrolling navigation
- ✅ Scroll-triggered animations
- ✅ Interactive dashboard preview
- ✅ Hover effects on cards and buttons
- ✅ Fixed navigation bar with scroll effects
- ✅ Modern, clean UI design
- ✅ Accessible HTML structure
- ✅ SEO-friendly markup

## Next Steps

To make this production-ready, consider:

1. **Add real company logos** - Replace placeholder logos in the social proof section
2. **Connect demo booking** - Integrate with a booking system (Calendly, HubSpot, etc.)
3. **Add analytics** - Implement Google Analytics or similar
4. **Optimize images** - Add real dashboard screenshots and optimize file sizes
5. **Add contact form** - Create a contact form for "Talk to our team" CTA
6. **SEO optimization** - Add meta tags, Open Graph tags, and structured data
7. **Performance** - Minify CSS/JS, optimize fonts, add lazy loading

## License

This website template is created for Thread. All rights reserved.

