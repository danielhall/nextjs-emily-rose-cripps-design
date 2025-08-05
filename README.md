# Emily Rose Cripps Design - Portfolio Website

A beautifully crafted Next.js portfolio website for Emily Rose Cripps, showcasing design work and creative projects. Developed by **Daniel Hall**, Solutions Architect.

## About the Project

This is a custom-built portfolio website designed to showcase Emily Rose Cripps' design work with:

- Clean, modern design aesthetic
- Interactive portfolio galleries
- Responsive design for all devices
- Content management through Sanity CMS
- Optimised performance and SEO

## Tech Stack

- **Framework:** Next.js with App Router
- **Content Management:** Sanity.io headless CMS
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

## Features

- 🎨 Portfolio gallery with project showcases
- 📱 Fully responsive design
- ⚡ Optimised performance and loading speeds
- 📝 Content management system for easy updates
- 🔍 SEO optimised for better visibility
- 📧 Contact form integration

## Getting Started

### Prerequisites

- Node.js 22.18.0 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/danielhall/nextjs-emily-rose-cripps-design.git
cd nextjs-emily-rose-cripps-design
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your Sanity project credentials and email configuration.

4. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Required environment variables (see `.env.example`):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (usually 'production')
- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version
- `EMAIL_USER` - Email for contact form
- `EMAIL_PASS` - Email password/app password

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Developer

**Daniel Hall**  
Solutions Architect  
[https://danieljh.uk](https://danieljh.uk)

## Licence

Copyright © 2025 Daniel Hall. All rights reserved.

This project is provided for portfolio demonstration purposes. See [LICENSE](./LICENSE) for full terms and conditions.
