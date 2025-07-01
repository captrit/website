import Link from 'next/link';
import { generateMetadata } from './not-found-metadata';
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd } from './not-found-jsonLd';

export { generateMetadata };

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-xl w-full text-center">
        <h1 className="text-6xl font-black text-brand-600 mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all duration-300 shadow-lg">Go to Homepage</Link>
      </div>
    </main>
  );
} 