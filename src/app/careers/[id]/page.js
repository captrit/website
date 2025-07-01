import { getJobData, getAllJobIds } from '../../../lib/jobs';
import JobDetailClient from './JobDetailClient';

// Generate static params for all job IDs
export async function generateStaticParams() {
  const paths = getAllJobIds();
  return paths;
}

// Generate metadata for each job
export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const jobData = await getJobData(awaitedParams.id);
  
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": jobData.title,
        "item": `https://captrit.ae/careers/${awaitedParams.id}`
      }
    ]
  };

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobData.title,
    "description": jobData.description || jobData.excerpt,
    "datePosted": jobData.date,
    "validThrough": jobData.validThrough || jobData.date,
    "employmentType": jobData.employmentType || jobData.type,
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": jobData.location || "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      }
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Captrit",
      "logo": "https://captrit.ae/images/logo.png"
    },
    "qualifications": jobData.requirements ? jobData.requirements.join(", ") : "",
    "responsibilities": jobData.responsibilities ? jobData.responsibilities.join(", ") : ""
  };

  return {
    title: `${jobData.title} | Careers at Captrit`,
    description: jobData.excerpt || jobData.description || `Join our team as ${jobData.title} at Captrit. Apply now for this exciting cybersecurity opportunity.`,
    keywords: `${jobData.title}, cybersecurity jobs, security careers, captrit careers, ${jobData.location || 'dubai'} security jobs, ${jobData.category || 'security'} jobs`,
    openGraph: {
      url: `https://captrit.ae/careers/${awaitedParams.id}`,
      title: `${jobData.title} | Careers at Captrit`,
      description: jobData.excerpt || jobData.description || `Join our team as ${jobData.title} at Captrit. Apply now for this exciting cybersecurity opportunity.`,
      type: 'website',
      images: [
        {
          url: jobData.cover || "https://captrit.ae/images/og-careers.jpg",
          width: 1200,
          height: 630,
          alt: jobData.title
        }
      ]
    },
    twitter: {
      handle: "@captritcybersec",
      site: "@captritcybersec",
      cardType: "summary_large_image"
    },
    alternates: {
      canonical: `https://captrit.ae/careers/${awaitedParams.id}`
    }
  };
}

// This is the new way to fetch data in App Router
async function getData(id) {
  try {
    console.log('Loading job data for ID:', id);
    const jobData = await getJobData(id);
    console.log('Job data loaded:', jobData ? 'Success' : 'Failed', jobData?.title);
    return {
      jobData,
    };
  } catch (error) {
    console.error('Error in getData:', error);
    return {
      jobData: null,
    };
  }
}

// This replaces getStaticProps in App Router
export default async function JobDetailPage({ params }) {
  const awaitedParams = await params;
  console.log('JobDetailPage params:', awaitedParams);
  const { jobData } = await getData(awaitedParams.id);
  
  if (!jobData) {
    console.log('No job data found, showing error page');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": jobData.title,
        "item": `https://captrit.ae/careers/${jobData.id}`
      }
    ]
  };

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobData.title,
    "description": jobData.description || jobData.excerpt,
    "datePosted": jobData.date,
    "validThrough": jobData.validThrough || jobData.date,
    "employmentType": jobData.employmentType || jobData.type,
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": jobData.location || "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      }
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Captrit",
      "logo": "https://captrit.ae/images/logo.png"
    },
    "qualifications": jobData.requirements ? jobData.requirements.join(", ") : "",
    "responsibilities": jobData.responsibilities ? jobData.responsibilities.join(", ") : ""
  };
  
  console.log('Rendering JobDetailClient with job data:', jobData.title);
  return (
    <JobDetailClient 
      jobData={jobData}
      breadcrumbJsonLd={JSON.stringify(breadcrumbJsonLd)}
      jobPostingJsonLd={JSON.stringify(jobPostingJsonLd)}
    />
  );
} 