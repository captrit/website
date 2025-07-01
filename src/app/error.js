"use client";
import Link from 'next/link';
import { generateMetadata } from './error-metadata';
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd } from './error-jsonLd';

export default function Error({ error, reset }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-xl w-full text-center">
        <h1 className="text-6xl font-black text-brand-600 mb-6">Error</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Something went wrong</h2>
        <p className="text-lg text-gray-600 mb-8">An unexpected error occurred. Please try again or return to the homepage.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all duration-300 shadow-lg">Go to Homepage</Link>
        {reset && (
          <button onClick={reset} className="mt-6 inline-block px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300 shadow">Try Again</button>
        )}
      </div>
    </main>
  );
} 