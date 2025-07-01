# CAPTRIT - Cybersecurity Solutions

A modern, comprehensive cybersecurity website for CAPTRIT - specializing in cybersecurity services for tech startups, SaaS products, and dev-first companies.

## 🚀 Features

- **Modern UI/UX**: Clean design with glassmorphism effects and smooth animations
- **Responsive Design**: Optimized for all devices and screen sizes
- **SEO Optimized**: Complete SEO implementation with structured data
- **Interactive Pricing**: Dynamic pricing cards with AED/USD toggle
- **On-Demand Services**: Comprehensive service catalog with flexible pricing
- **Contact Integration**: Nodemailer-powered contact forms
- **Blog System**: Markdown-based blog with rich content
- **Career Portal**: Job listings and application system
- **Performance**: Optimized for speed and Core Web Vitals

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: JavaScript/React 19.1.0
- **Styling**: Tailwind CSS 3.3.3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer
- **SEO**: Next-SEO
- **Deployment**: Vercel/Netlify ready

## 📊 Analytics & Tracking

This site includes the following analytics and tracking integrations (configured in `src/app/layout.js`):

- **Google Analytics (gtag.js)** — Website traffic, conversions, and behavior analytics.
- **LinkedIn Insight Tag** — LinkedIn ad conversion tracking and retargeting.
- **Microsoft Clarity** — Session recordings, heatmaps, and user behavior insights.

**How it works:**
All scripts are loaded using Next.js best practices (`next/script` in the `<head>`).
No additional setup is required unless you wish to change tracking IDs.

**To add more analytics:**
Edit `src/app/layout.js` and follow the same pattern for other providers (e.g., Meta Pixel, Hotjar, etc.).

## 📋 Prerequisites
