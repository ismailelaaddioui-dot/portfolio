# Quick Start Guide

Get your portfolio running locally in 3 steps:

## 1. Install Dependencies

```bash
npm install
```

This will install Next.js, React, and all required packages.

## 2. Run Development Server

```bash
npm run dev
```

## 3. Open in Browser

Navigate to: **http://localhost:3000**

---

## What You'll See

The site is pre-loaded with placeholder gradient images so you can preview the design immediately.

## Next Steps

1. **Replace placeholder images** in `/public/images/` with your actual photos
2. **Customize content** (see README.md for details)
3. **Deploy to Vercel** (see DEPLOYMENT.md for step-by-step guide)

## File Structure Overview

```
├── app/
│   ├── page.tsx                  ← Homepage
│   ├── gallery/page.tsx          ← Gallery page
│   ├── commission/page.tsx       ← Commission info
│   ├── personal-works/page.tsx   ← Personal projects
│   ├── book/page.tsx             ← Book page
│   ├── about/page.tsx            ← About you
│   └── contact/page.tsx          ← Contact form
├── public/images/                ← Your photos go here
└── README.md                     ← Full documentation
```

## Build for Production

Test production build locally:

```bash
npm run build
npm start
```

This creates an optimized version of your site.

---

**Need help?** Check README.md and DEPLOYMENT.md for detailed instructions.
