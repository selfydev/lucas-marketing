# Lucas Marketing Site

Marketing website for [Lucas AI](https://meetlucas.ai) - an AI-powered college admissions advisor platform.

## About

This is the public-facing marketing website for Lucas AI, showcasing the platform's features, benefits, and helping students join the waitlist. The site is built with modern web technologies for optimal performance and SEO.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React + SSR)
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Deployment**: Vercel

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run check-types
```

## Project Structure

```
src/
├── routes/          # TanStack Router file-based routes
├── components/      # React components
│   ├── sections/    # Page sections (Hero, Features, etc.)
│   └── ...
├── lib/             # Utilities and helpers
└── styles/          # Global styles
```

## Deployment

The site is automatically deployed to Vercel when changes are pushed to the `tanstack-router` branch.

**Production URL**: https://meetlucas.ai

## Environment Variables

Required for production builds:

- `VITE_SERVER_URL` - API server URL
- `VITE_AUTH_URL` - Authentication endpoint URL
- `VITE_APP_ENV` - Environment (`production` or `staging`)

