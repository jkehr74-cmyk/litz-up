# Gold Palm Tree Removal - Technical Specification

## 1. Tech Stack Overview

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Inter (Google Fonts) |

## 2. Tailwind Configuration Guide

```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#FFD700',
        'gp-green': {
          DEFAULT: '#1B5E20',
          light: '#2E7D32',
          dark: '#0D3B12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

## 3. Component Inventory

### Shadcn/UI Components (Built-in)

| Component | Usage | Style Overrides |
|-----------|-------|-----------------|
| Button | CTAs, nav buttons | Custom colors (orange/yellow) |
| Card | Feature cards, pricing | Custom shadows, borders |
| Accordion | FAQ section | Custom icons, animations |
| Sheet | Mobile navigation | Slide from right |
| Badge | Tags, status indicators | Custom colors |
| Separator | Section dividers | Custom color |

### Custom Components

| Component | Props | Description |
|-----------|-------|-------------|
| EmergencyBanner | - | Top orange banner with phone |
| Header | - | Logo + nav + CTA |
| HeroSection | - | Main hero with stats |
| RiskSection | - | Warning cards with costs |
| EquipmentSection | - | 3-column equipment cards |
| BeforeAfterGallery | - | Before/after image comparison |
| WhyChooseSection | - | Feature grid with badges |
| TestimonialsSection | - | Customer review cards |
| CoverageSection | - | Service area info |
| PricingSection | - | Pricing cards |
| FAQSection | - | Accordion FAQ |
| CTASection | - | Final call-to-action |
| Footer | - | Multi-column footer |
| StatCard | number, label | Stats display card |
| FeatureCard | icon, title, desc, badge? | Feature with icon |
| TestimonialCard | quote, author, rating, tags | Review card |
| PricingCard | title, price, features | Pricing tier card |

## 4. Animation Implementation Plan

| Interaction Name | Tech Choice | Implementation Logic |
|------------------|-------------|---------------------|
| Page Load Sequence | Framer Motion | `staggerChildren: 0.1` on container, `y: 20 -> 0` + opacity fade on items |
| Emergency Banner Slide | Framer Motion | `initial: { y: -40 }`, `animate: { y: 0 }`, duration 0.3s |
| Hero Text Reveal | Framer Motion | `staggerChildren: 0.1`, each child fades in + slides up |
| Stats Counter | Framer Motion | `useInView` trigger, animate numbers from 0 |
| Section Fade In | Framer Motion | `whileInView`, `viewport: { once: true, amount: 0.2 }` |
| Card Hover Lift | Tailwind + FM | `whileHover: { y: -4 }`, shadow transition |
| Button Hover | Tailwind | `hover:scale-[1.02] hover:brightness-110` |
| Accordion Expand | Framer Motion | `AnimatePresence`, height animation |
| Mobile Menu | Framer Motion | `Sheet` component with slide animation |
| Phone Pulse | CSS Animation | `animate-pulse-slow` subtle scale pulse |

### Animation Timing Constants

```typescript
const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
  stagger: 0.1,
};
```

## 5. Project File Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── EmergencyBanner.tsx
│   │   ├── Header.tsx
│   │   ├── StatCard.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── PricingCard.tsx
│   │   └── MobileNav.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── RiskSection.tsx
│   │   ├── EquipmentSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── WhyChooseSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CoverageSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── images/
│       ├── logo.png
│       ├── before-tree.jpg
│       ├── after-tree.jpg
│       ├── crane-truck.jpg
│       ├── cutting-tools.jpg
│       └── cleanup-crew.jpg
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 6. Package Installation List

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Gold Palm Tree Removal"

# Install shadcn components
npx shadcn add button card accordion sheet badge separator

# Install animation library
npm install framer-motion

# Install icons
npm install lucide-react

# Install utilities
npm install clsx tailwind-merge
```

## 7. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, hamburger nav, stacked cards |
| Tablet | 640-1024px | 2-column grids, condensed spacing |
| Desktop | > 1024px | Full layout, 3-4 column grids |

## 8. Performance Considerations

- Use `will-change` on animated elements
- Lazy load images below the fold
- Use `transform` and `opacity` for animations only
- Implement `prefers-reduced-motion` media query
- Optimize images with WebP format

## 9. Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- Focus visible states
- Color contrast ratio 4.5:1 minimum
- Alt text for all images
