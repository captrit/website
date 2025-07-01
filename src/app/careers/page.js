import { getSortedJobsData, getAllJobCategories } from '../../lib/jobs';
import CareersClient from './CareersClient';

// Use the new App Router data fetching method
export async function generateStaticParams() {
  return [];
}

// This replaces getStaticProps in App Router
export async function generateMetadata() {
  const allJobsData = getSortedJobsData();
  
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
        "name": "Careers",
        "item": "https://captrit.ae/careers"
      }
    ]
  };

  const jobsJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Captrit",
    "url": "https://captrit.ae",
    "logo": "https://captrit.ae/images/logo.png",
    "sameAs": [
      "https://captrit.ae"
    ],
    "jobPosting": allJobsData.slice(0, 10).map(job => ({
      "@type": "JobPosting",
      "title": job.title,
      "description": job.excerpt,
      "datePosted": job.date,
      "validThrough": job.validThrough,
      "employmentType": job.employmentType,
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Captrit",
        "logo": "https://captrit.ae/images/logo.png"
      }
    }))
  };

  return {
    title: "Careers at Captrit | Join Our Cybersecurity Team",
    description: "Join our dynamic cybersecurity team at Captrit. Explore exciting career opportunities in security engineering, penetration testing, and cyber defense. Make a difference in digital security.",
    keywords: "cybersecurity careers, security jobs, penetration testing jobs, cyber defense careers, security engineering, captrit careers, dubai security jobs, uae cybersecurity",
    openGraph: {
      url: "https://captrit.ae/careers",
      title: "Careers at Captrit | Join Our Cybersecurity Team",
      description: "Join our dynamic cybersecurity team at Captrit. Explore exciting career opportunities in security engineering, penetration testing, and cyber defense. Make a difference in digital security.",
      type: 'website',
      images: [
        {
          url: "https://captrit.ae/images/og-careers.jpg",
          width: 1200,
          height: 630,
          alt: "Careers at Captrit"
        }
      ]
    },
    twitter: {
      handle: "@captritcybersec",
      site: "@captritcybersec",
      cardType: "summary_large_image"
    },
    alternates: {
      canonical: "https://captrit.ae/careers"
    }
  };
}

// This is the new way to fetch data in App Router
async function getData() {
  try {
    // Get all jobs data dynamically from the jobs directory
    const allJobsData = getSortedJobsData();
    
    // Get all job categories dynamically
    const categories = getAllJobCategories();
    
    console.log(`Loaded ${allJobsData.length} job postings and ${categories.length} categories`);
    
    return {
      allJobsData,
      categories,
    };
  } catch (error) {
    console.error('Error in getData:', error);
    return {
      allJobsData: [],
      categories: ['All'],
    };
  }
}

// This replaces getStaticProps in App Router
export default async function CareersIndexPage() {
  const { allJobsData, categories } = await getData();

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
        "name": "Careers",
        "item": "https://captrit.ae/careers"
      }
    ]
  };

  const jobsJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Captrit",
    "url": "https://captrit.ae",
    "logo": "https://captrit.ae/images/logo.png",
    "sameAs": [
      "https://captrit.ae"
    ],
    "jobPosting": allJobsData.slice(0, 10).map(job => ({
      "@type": "JobPosting",
      "title": job.title,
      "description": job.excerpt,
      "datePosted": job.date,
      "validThrough": job.validThrough,
      "employmentType": job.employmentType,
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Captrit",
        "logo": "https://captrit.ae/images/logo.png"
      }
    }))
  };

  return (
    <CareersClient 
      allJobsData={allJobsData} 
      categories={categories}
      breadcrumbJsonLd={JSON.stringify(breadcrumbJsonLd)}
      jobsJsonLd={JSON.stringify(jobsJsonLd)}
    />
  );
} 