import { Organization, WebSite, BreadcrumbList } from 'react-schemaorg';

export const OrganizationSchema = () => (
  <Organization
    type="Organization"
    name="Captrit"
    url="https://captrit.ae"
    logo="https://captrit.ae/images/logo.png"
    sameAs={[
      'https://twitter.com/captrit',
      'https://linkedin.com/company/captrit',
      'https://facebook.com/captrit'
    ]}
  />
);

export const WebSiteSchema = () => (
  <WebSite
    type="WebSite"
    name="Captrit"
    url="https://captrit.ae"
    potentialAction={{
      type: "SearchAction",
      target: "https://captrit.ae/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }}
  />
);

export const BreadcrumbSchema = ({ items }) => (
  <BreadcrumbList
    type="BreadcrumbList"
    itemListElement={items.map((item, index) => ({
      type: "ListItem",
      position: index + 1,
      item: {
        "@id": item.url,
        name: item.name
      }
    }))}
  />
);

export const BlogPostSchema = ({ post }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.cover,
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
        "description": post.excerpt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://captrit.ae/blog/${post.slug}`
        }
      })
    }}
  />
); 