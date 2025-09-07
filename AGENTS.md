# DAC Live Editor - Agent Guide

## Build Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Structure**: Standard App Router layout (`app/` directory)
  - `app/layout.tsx` - Root layout with font loading
  - `app/page.tsx` - Home page component
  - `app/globals.css` - Global styles

## Code Style & Conventions
- **TypeScript**: Strict mode enabled, ES2017 target
- **Imports**: Type imports with `import type`, relative imports for local files
- **Components**: Default exports for page components, descriptive prop types
- **Styling**: Tailwind utility classes, responsive design patterns
- **Fonts**: Geist Sans/Mono with CSS variables for theming
- **ESLint**: Next.js recommended rules with TypeScript support
- **Path aliases**: `@/*` maps to root directory
