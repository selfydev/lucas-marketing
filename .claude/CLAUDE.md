# CLAUDE.md - Marketing Site Migration Guide

This file provides guidance to Claude Code when working with the marketing site migration from the old landing page.

## Project Overview

This is a modern marketing website built with:
- **TanStack Start** (React framework)
- **Tailwind CSS 4** (with new `@theme` syntax)
- **shadcn/ui** components
- **TypeScript**
- **Vite** for bundling

## Old vs New Site Locations

- **Old site**: `/Users/axeltalmet/Documents/GitHub/lucas-landing/client/src`
- **New site**: `/Users/axeltalmet/Documents/GitHub/lucas-ai/apps/marketing`

## Essential Commands

```bash
bun run dev              # Start dev server
bun run build            # Build for production
bun run check-types      # TypeScript type checking
bun run check            # Run linter/formatter check
bun run fix              # Auto-fix linting/formatting issues
```

## Migration Principles

### 1. Professional & Tight Approach
- Only install dependencies that will actually be used
- Only add shadcn/ui components that are needed
- Keep the migration clean and minimal
- Design must look and work EXACTLY the same as the original

### 2. Research First
When migrating a new section or feature:
- Use context7, Ref, or Firecrawl to research best practices
- Use sequential thinking to plan the approach
- Present a plan before implementing
- Verify all technical details are correct

## Tailwind CSS 4 Configuration

### Font Configuration (CRITICAL)

**✅ CORRECT WAY:**

```css
/* In app.css */

/* 1. Define @font-face with SAME family name, different weights */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* 2. Override --font-sans in @theme to make it the default */
@theme {
  --font-sans:
    "Neue Montreal", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

**Usage in components:**
```tsx
// No font classes needed - uses Neue Montreal by default
<h1 className="text-4xl">This uses Neue Montreal Regular</h1>

// Use font-medium for medium weight
<h1 className="text-4xl font-medium">This uses Neue Montreal Medium</h1>
```

**❌ WRONG WAYS:**

```css
/* DON'T create custom font variables */
@theme inline {
  --font-family-neue: "Neue Montreal", sans-serif;  /* WRONG */
}
```

```tsx
/* DON'T use inline font declarations */
<h1 className="font-[family-name:--font-family-neue]">  {/* WRONG */}
```

### Color Configuration (CRITICAL)

**✅ CORRECT WAY:**

```css
/* In app.css */

:root {
  /* Use oklch format for colors */
  --primary: oklch(0.52 0.15 142);           /* Brand green */
  --foreground: oklch(0.30 0.08 158);        /* Dark green text */
  --primary-foreground: oklch(1 0 0);        /* White */
  /* ... other theme colors */
}
```

**Usage in components:**
```tsx
// Use semantic color classes
<div className="bg-primary text-primary-foreground">
<p className="text-foreground">
<Badge className="bg-primary/5 text-primary">
```

**❌ WRONG WAYS:**

```tsx
/* DON'T use inline hex colors */
<div className="bg-[#3e8f23]">  {/* WRONG */}
<p className="text-[#245039]">  {/* WRONG */}
```

### Theme Customization Rules

1. **Override existing theme variables** in `:root` or `.dark`
2. **Extend with new utilities** using `@theme` directive
3. **Use oklch color format** for better color consistency
4. **Use semantic names** (primary, foreground, etc.) not specific colors

## Asset Management

### Directory Structure
```
apps/marketing/
├── public/
│   ├── fonts/              # Font files (.woff2)
│   └── assets/             # Images, SVGs, etc.
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   └── sections/      # Page sections (HeroSection, etc.)
│   ├── styles/
│   │   └── app.css        # Global styles and theme
│   └── routes/            # TanStack Router routes
```

### Copying Assets from Old Site

When migrating a section:
1. Identify required fonts, images, SVGs
2. Copy fonts to `public/fonts/`
3. Copy images/SVGs to `public/assets/`
4. Reference with `/fonts/...` or `/assets/...` in code

## Component Architecture

### Section Components

Place in `src/components/sections/`:
```tsx
// HeroSection.tsx
export function HeroSection() {
  return (
    <section className="...">
      {/* Component content */}
    </section>
  );
}
```

### shadcn/ui Components

Only install what you actually need:
```bash
# Check if component exists first
npx shadcn@latest add button
npx shadcn@latest add badge
```

## CSS Patterns

### Custom Animations

Define in `app.css`:
```css
@keyframes highlightDraw {
  0% { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Use in components */
.highlight-effect {
  animation: highlightDraw 1.5s ease-out;
}
```

### Glassmorphism Effects

```css
.glass-effect {
  background: rgba(249, 249, 249, 0.35);
  backdrop-filter: blur(20px);
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.06);
}
```

## Migration Workflow

### Step-by-Step Process

1. **Research & Plan**
   - Read old component structure
   - Identify dependencies (fonts, images, libraries)
   - Check existing dependencies in package.json
   - Use ultrathink and sequential thinking
   - Present migration plan

2. **Install Dependencies**
   - Only install what's needed
   - Check if motion/animation libraries already exist
   - Verify shadcn components not already installed

3. **Copy Assets**
   - Copy fonts to `public/fonts/`
   - Copy images/SVGs to `public/assets/`
   - Verify file paths

4. **Migrate CSS**
   - Add font declarations to `app.css`
   - Override `--font-sans` in `@theme` for default font
   - Add custom animations/effects
   - Update color theme variables
   - NO inline colors or fonts

5. **Create Component**
   - Build component in `src/components/sections/`
   - Use semantic theme colors (bg-primary, text-foreground)
   - Use standard font classes (font-medium) - NO inline fonts
   - Maintain exact visual design
   - Add proper accessibility (aria-labels)

6. **Integrate**
   - Import and use in route
   - Test responsive behavior
   - Run type checker
   - Run linter

7. **Verify**
   - Visual match with original
   - Responsive works correctly
   - Animations work
   - No console errors

## Common Mistakes to Avoid

### ❌ Creating Custom Font Utilities
```css
/* WRONG - Don't do this */
@theme inline {
  --font-family-neue: "Neue Montreal", sans-serif;
}
```

### ❌ Inline Font Declarations
```tsx
{/* WRONG - Don't do this */}
<h1 className="font-[family-name:--font-family-neue]">
```

### ❌ Inline Color Values
```tsx
{/* WRONG - Don't do this */}
<div className="bg-[#3e8f23] text-[#245039]">
```

### ❌ Multiple Font Family Names
```css
/* WRONG - Don't do this */
@font-face {
  font-family: "Neue_Montreal-Regular";  /* Different names */
  font-weight: 400;
}
@font-face {
  font-family: "Neue_Montreal-Medium";  /* Different names */
  font-weight: 500;
}
```

### ✅ Correct Patterns

```css
/* CORRECT - Same family, different weights */
@font-face {
  font-family: "Neue Montreal";  /* Same name */
  font-weight: 400;
}
@font-face {
  font-family: "Neue Montreal";  /* Same name */
  font-weight: 500;
}

/* CORRECT - Override default sans */
@theme {
  --font-sans: "Neue Montreal", ui-sans-serif, system-ui, sans-serif;
}
```

```tsx
{/* CORRECT - Use semantic colors */}
<div className="bg-primary text-foreground">
<Badge className="bg-primary/5 text-primary">

{/* CORRECT - Use standard font classes */}
<h1 className="font-medium">This uses medium weight</h1>
<p>This uses regular weight by default</p>
```

## Type Safety

- All components must be TypeScript
- Use proper types for props
- Run `bun run check-types` before committing
- Fix all type errors immediately

## Code Quality

- Run `bun run fix` before committing
- Expected warnings:
  - SVG accessibility (OK if aria-labels present)
  - CSS parse warnings (OK for Tailwind CSS 4 syntax)
- No unused imports or variables
- Use double quotes for strings
- Tab indentation

## Performance

- Use `font-display: swap` for all fonts
- Optimize images before adding
- Use proper lazy loading for images
- Keep bundle size minimal

## Accessibility

- Add `aria-label` to decorative SVGs
- Maintain proper heading hierarchy
- Ensure keyboard navigation works
- Test with screen readers

## Key Takeaways

1. **Always override `--font-sans`** to set default font - don't create custom font utilities
2. **Use semantic color classes** (bg-primary, text-foreground) - never inline colors
3. **Same font-family name, different weights** - browser handles variant selection
4. **Research first, implement second** - use available tools
5. **Keep it minimal** - only add what's needed
6. **Match original exactly** - design must be identical

---

When in doubt, reference this guide. The most common errors are around font and color configuration - always follow the patterns shown here.
