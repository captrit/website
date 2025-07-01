import { getPostData, getSortedPostsData, getAllPostSlugs } from '../../../lib/posts';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  try {
    const posts = getAllPostSlugs();
    console.log(`Generating static params for ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const postData = await getPostData(resolvedParams.slug);
    
    return {
      title: `${postData.title} | Captrit Security Blog`,
      description: postData.excerpt,
      openGraph: {
        title: `${postData.title} | Captrit Security Blog`,
        description: postData.excerpt,
        images: [postData.cover || "https://captrit.ae/images/og-image.jpg"],
        type: 'article',
        article: {
          publishedTime: postData.date,
          modifiedTime: postData.date,
          tags: [postData.category, 'cybersecurity', 'security', 'blog']
        }
      },
      twitter: {
        handle: "@captritcybersec",
        site: "@captritcybersec",
        cardType: "summary_large_image"
      },
      keywords: [postData.category, 'cybersecurity', 'security blog', postData.title?.toLowerCase(), 'captrit', 'dubai', 'uae', 'security tips', 'cyber defense', 'information security'],
      alternates: {
        canonical: `https://captrit.ae/blog/${postData.slug}`
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Captrit Security Blog',
      description: 'Cybersecurity insights and updates from Captrit'
    };
  }
}

// This is the new way to fetch data in App Router
async function getData(slug) {
  try {
    console.log('Getting data for slug:', slug);
    
    // Get the specific post data
    const postData = await getPostData(slug);
    
    // Get all posts for related posts section
    const allPostsData = getSortedPostsData();
    
    // Find related posts (exclude current post and get up to 3 related)
    const relatedPosts = allPostsData
      .filter(post => post.slug !== slug)
      .slice(0, 3);
    
    console.log(`Loaded post data for: ${postData.title}`);
    
    return {
      post: postData, // Changed from postData to post to match BlogPostClient props
      relatedPosts, // Changed from allPostsData to relatedPosts
    };
  } catch (error) {
    console.error(`Error getting data for slug ${slug}:`, error);
    return {
      post: {
        slug: slug,
        title: `Error loading post: ${slug}`,
        content: '# Error Loading Post\n\nSorry, there was an error loading this post.',
        date: new Date().toISOString(),
        excerpt: 'There was an error loading this post.',
        cover: null,
        category: 'Uncategorized'
      },
      relatedPosts: [],
    };
  }
}

// This replaces getStaticProps in App Router
export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const { post, relatedPosts } = await getData(resolvedParams.slug);

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://captrit.ae/blog/${post.slug}`
      }
    ]
  };

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover || "https://captrit.ae/images/og-image.jpg",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Captrit"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Captrit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://captrit.ae/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://captrit.ae/blog/${post.slug}`
    }
  };

  return (
    <BlogPostClient 
      post={post} 
      relatedPosts={relatedPosts}
      breadcrumbJsonLd={JSON.stringify(breadcrumbJsonLd)}
      blogPostingJsonLd={JSON.stringify(blogPostingJsonLd)}
    />
  );
} 