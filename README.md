# Ismail El Aaddioui - Photography Portfolio

A minimal, editorial-style photography portfolio built with Next.js 14 and deployed on Vercel.

## Features

- ✨ Clean, minimal design inspired by editorial photography
- 📱 Fully responsive across all devices
- 🎨 Beautiful typography with Cormorant Garamond & Inter
- 🖼️ Optimized image handling with Next.js Image component
- 🌐 Bilingual presentation (English/Arabic)
- ⚡ Static site generation for optimal performance
- 🎯 SEO-friendly structure

## Pages

- **Home** - Asymmetric hero grid with featured images
- **Gallery** - Grid layout showcasing photography work
- **Commission** - Information about available services
- **Personal Works** - Personal photography projects
- **Book** - Details about published photography book
- **About** - Photographer biography and experience
- **Contact** - Contact form and information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your images to `/public/images/`:**

   Required image files (you can use any format: .jpg, .png, .webp):
   
   **Homepage:**
   - `hero-1.jpg` (landscape/portrait photo)
   - `hero-2.jpg` (silhouette/water photo)
   
   **Gallery page:**
   - `gallery-1.jpg` through `gallery-6.jpg`
   
   **Commission page:**
   - `commission-1.jpg`
   - `commission-2.jpg`
   
   **Personal Works:**
   - `personal-1.jpg` through `personal-4.jpg`
   
   **About page:**
   - `about-portrait.jpg` (your portrait photo)
   
   **Book page:**
   - `book-cover.jpg` (book cover image)
   - `book-preview-1.jpg` through `book-preview-3.jpg`

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Customization

### Update Personal Information

1. **Edit About page bio:** `app/about/page.tsx`
2. **Update contact email:** `app/contact/page.tsx` (line with mailto:)
3. **Add social media links:** `app/contact/page.tsx` (in the social section)
4. **Modify book details:** `app/book/page.tsx`

### Styling

All styles are in CSS Modules (`.module.css` files) next to each page component. The global styles and typography are in `app/globals.css`.

### Fonts

Currently using:
- **Cormorant Garamond** (serif) for headings and names
- **Inter** (sans-serif) for body text and navigation

To change fonts, edit the Google Fonts import in `app/globals.css`.

## Deployment to Vercel (FREE)

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts. Vercel will automatically detect this is a Next.js project.

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub

1. **Push your code to GitHub**

2. **Go to [vercel.com](https://vercel.com)**

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Vercel will auto-detect Next.js settings**

6. **Click "Deploy"**

Your site will be live at: `your-project-name.vercel.app`

### Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS settings as instructed by Vercel

Vercel's free tier includes:
- Unlimited personal projects
- Automatic HTTPS
- Global CDN
- Preview deployments
- Analytics

## File Structure

```
ismail-portfolio/
├── app/
│   ├── about/
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── book/
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── commission/
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── Navigation.module.css
│   ├── contact/
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── gallery/
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── personal-works/
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── page.module.css
├── public/
│   └── images/
│       └── (your photos here)
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Adding More Photos

To add more images to any gallery:

1. Add image files to `/public/images/`
2. Edit the respective page component (e.g., `app/gallery/page.tsx`)
3. Add new entries to the image array
4. Save and rebuild

## Performance Tips

- Use WebP format for images (smaller file size)
- Optimize images before uploading (recommended max 2000px width)
- Next.js automatically optimizes images, but starting with smaller files helps

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a custom-built portfolio website. Feel free to use as inspiration but please don't copy directly.

## Support

For any issues or questions about deployment, consult:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

Built with Next.js 14 | Hosted on Vercel
