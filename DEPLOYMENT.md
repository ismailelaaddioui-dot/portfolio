# Deploying to Vercel - Step by Step Guide

This guide will help you deploy your photography portfolio to Vercel completely **FREE**.

## What is Vercel?

Vercel is a cloud platform for hosting static sites and serverless functions. Their free tier is perfect for portfolio websites and includes:
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN (fast loading worldwide)
- ✅ Automatic deployments from GitHub
- ✅ Custom domains (you can use your own domain)
- ✅ 100GB bandwidth/month

## Prerequisites

Before you begin, you'll need:
1. A GitHub account (free) - [Sign up here](https://github.com/signup)
2. A Vercel account (free) - [Sign up here](https://vercel.com/signup)
3. Git installed on your computer

## Method 1: Deploy via GitHub (Recommended for Beginners)

### Step 1: Add Your Photos

1. Replace the placeholder images in `/public/images/` with your actual photos
2. Make sure image filenames match those listed in README.md
3. Recommended image format: JPG or WebP
4. Recommended max width: 2000px

### Step 2: Customize Your Content

1. **Update Contact Information:**
   - Edit `app/contact/page.tsx`
   - Change email address (search for "hello@ismailaaddioui.com")
   - Add your social media links

2. **Update About Page:**
   - Edit `app/about/page.tsx`
   - Replace bio text with your own story

3. **Customize Book Page:**
   - Edit `app/book/page.tsx`
   - Update book title, description, and details

### Step 3: Create GitHub Repository

1. **Go to GitHub and create a new repository:**
   - Click the "+" icon → "New repository"
   - Name it something like "my-portfolio"
   - Make it Public
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code to GitHub:**
   
   Open terminal/command prompt in your project folder and run:
   
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Create first commit
   git commit -m "Initial portfolio setup"
   
   # Add GitHub repository as remote
   git remote add origin https://github.com/YOUR-USERNAME/my-portfolio.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```
   
   Replace `YOUR-USERNAME` with your GitHub username.

### Step 4: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository:**
   - You'll see a list of your repositories
   - Find your portfolio repository
   - Click "Import"

4. **Configure Project:**
   - Project Name: Choose a name (this will be in your URL)
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (should auto-detect)
   - Output Directory: `out` (should auto-detect)
   - Don't change any other settings
   - Click "Deploy"

5. **Wait for deployment (usually 2-3 minutes)**

6. **Your site is live! 🎉**
   - URL will be: `your-project-name.vercel.app`
   - Click "Visit" to see your portfolio

## Method 2: Deploy via Vercel CLI (For Developers)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser for authentication.

### Step 3: Deploy

Navigate to your project folder and run:

```bash
vercel
```

Follow the prompts:
- Set up and deploy? `Y`
- Which scope? (select your account)
- Link to existing project? `N`
- What's your project's name? (enter name)
- In which directory is your code located? `./`
- Want to override settings? `N`

### Step 4: Deploy to Production

```bash
vercel --prod
```

Your site is now live!

## Adding a Custom Domain

Once deployed, you can add your own domain:

### Step 1: Go to Project Settings
1. Open your project in Vercel dashboard
2. Click "Settings" tab
3. Click "Domains" in the sidebar

### Step 2: Add Domain
1. Enter your domain (e.g., `ismailaaddioui.com`)
2. Click "Add"

### Step 3: Update DNS Settings
Vercel will show you what DNS records to add. Go to your domain registrar (where you bought the domain) and add these records:

**For apex domain (ismailaaddioui.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

DNS changes can take up to 48 hours but usually work within a few hours.

## Automatic Deployments

The best part: Every time you push changes to GitHub, Vercel automatically rebuilds and deploys your site!

**To update your portfolio:**

1. Make changes to your code/images locally
2. Test locally: `npm run dev`
3. Commit changes: `git add . && git commit -m "Update photos"`
4. Push to GitHub: `git push`
5. Vercel automatically deploys the new version!

## Troubleshooting

### Build Failed
- Check build logs in Vercel dashboard
- Make sure all dependencies are in package.json
- Verify all image paths are correct

### Images Not Showing
- Verify images are in `/public/images/` folder
- Check image filenames match exactly (case-sensitive)
- Make sure images were pushed to GitHub

### Custom Domain Not Working
- DNS changes take time (up to 48 hours)
- Verify DNS records are correct
- Check domain registrar settings

## Environment Variables (Optional)

If you need to add environment variables (e.g., for contact form):

1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy

## Analytics (Optional)

Vercel provides free analytics:

1. Go to Project → Analytics tab
2. Enable analytics
3. View visitor stats, page views, and performance

## Cost

Your portfolio will be **100% FREE** on Vercel unless you:
- Exceed 100GB bandwidth/month (very unlikely for a portfolio)
- Need team features
- Need advanced analytics

For a photography portfolio, you'll stay well within the free tier limits.

## Support

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Vercel Community:** https://github.com/vercel/vercel/discussions

## Next Steps

After deployment:
1. Share your portfolio URL on social media
2. Add it to your email signature
3. Update your resume/CV with the link
4. Consider setting up Google Analytics (free)
5. Get a custom domain for a more professional look

Congratulations on deploying your photography portfolio! 📸✨
