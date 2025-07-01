import { getSortedPostsData, getAllCategories } from '../../lib/posts';
import BlogClient from './BlogClient';

// Use the new App Router data fetching method
export async function generateStaticParams() {
  return [];
}

// This replaces getStaticProps in App Router
export async function generateMetadata() {
  const allPostsData = getSortedPostsData();
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://captrit.ae"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://captrit.ae/blog"
      }
    ]
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Captrit Security Blog",
    "description": "Insights, tips, and updates from our cybersecurity experts to help you keep your digital assets secure",
    "url": "https://captrit.ae/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Captrit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://captrit.ae/images/logo.png"
      }
    },
    "blogPost": allPostsData.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.cover || "https://captrit.ae/images/og-image.jpg",
      "datePublished": post.date,
      "dateModified": post.date,
      "url": `https://captrit.ae/blog/${post.slug}`
    }))
  };

  return {
    title: "Captrit Security Blog | Cybersecurity Insights & Updates",
    description: "Stay updated with the latest cybersecurity insights, tips, and best practices from Captrit's expert team. Learn about emerging threats, security trends, and how to protect your digital assets.",
    keywords: "cybersecurity blog, security insights, cyber defense, information security, security tips, captrit, dubai, uae, security updates, cyber threats, security best practices",
    openGraph: {
      url: "https://captrit.ae/blog",
      title: "Captrit Security Blog | Cybersecurity Insights & Updates",
      description: "Stay updated with the latest cybersecurity insights, tips, and best practices from Captrit's expert team. Learn about emerging threats, security trends, and how to protect your digital assets.",
      type: 'website',
      images: [
        {
          url: "https://captrit.ae/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Captrit Security Blog"
        }
      ]
    },
    twitter: {
      handle: "@captritcybersec",
      site: "@captritcybersec",
      cardType: "summary_large_image"
    },
    alternates: {
      canonical: "https://captrit.ae/blog"
    }
  };
}

// This is the new way to fetch data in App Router
async function getData() {
  try {
    // Get all posts data dynamically from the posts directory
    const allPostsData = getSortedPostsData();
    
    // Get all categories dynamically
    const categories = getAllCategories();
    
    console.log(`Loaded ${allPostsData.length} blog posts and ${categories.length} categories`);
    
    return {
      allPostsData,
      categories,
    };
  } catch (error) {
    console.error('Error in getData:', error);
    return {
      allPostsData: [],
      categories: ['All'],
    };
  }
}

// This replaces getStaticProps in App Router
export default async function BlogIndexPage() {
  const { allPostsData, categories } = await getData();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://captrit.ae"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://captrit.ae/blog"
      }
    ]
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Captrit Security Blog",
    "description": "Insights, tips, and updates from our cybersecurity experts to help you keep your digital assets secure",
    "url": "https://captrit.ae/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Captrit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://captrit.ae/images/logo.png"
      }
    },
    "blogPost": allPostsData.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.cover || "https://captrit.ae/images/og-image.jpg",
      "datePublished": post.date,
      "dateModified": post.date,
      "url": `https://captrit.ae/blog/${post.slug}`
    }))
  };

  return (
    <BlogClient 
      allPostsData={allPostsData} 
      categories={categories}
      breadcrumbJsonLd={JSON.stringify(breadcrumbJsonLd)}
      blogJsonLd={JSON.stringify(blogJsonLd)}
    />
  );
} 