import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// Helper function to check if a URL is external
export function isExternalUrl(url) {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
}

// Extract image URLs from Markdown content
export function extractImagesFromMarkdown(content) {
  if (!content) return [];
  
  // Match both Markdown image syntax ![alt](url) and HTML <img src="url">
  const markdownImageRegex = /!\[.*?\]\((https?:\/\/[^)]+)\)/g;
  const htmlImageRegex = /<img.*?src=["'](https?:\/\/[^"']+)["']/g;
  
  const images = [];
  let match;
  
  // Extract Markdown image URLs
  while ((match = markdownImageRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  
  // Extract HTML image URLs
  while ((match = htmlImageRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  
  return [...new Set(images)]; // Remove duplicates
}

export function getSortedPostsData() {
  console.log('Getting sorted posts data from directory:', postsDirectory);
  
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist:', postsDirectory);
      return [];
    }
    
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    console.log('Found files in posts directory:', fileNames);
    
    if (fileNames.length === 0) {
      console.log('No files found in posts directory');
      return [];
    }
    
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');
        console.log('Processing file:', fileName, 'with slug:', slug);

        try {
          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');

          // Use gray-matter to parse the post metadata section
          const matterResult = matter(fileContents);
          console.log('Parsed frontmatter for:', slug, 'title:', matterResult.data.title);
          
          // Extract images from the markdown content
          const contentImages = extractImagesFromMarkdown(matterResult.content);

          // Combine the data with the slug and ensure all required fields exist
          return {
            slug,
            title: matterResult.data.title || 'Untitled Post',
            date: matterResult.data.date || new Date().toISOString(),
            author: matterResult.data.author || 'Captrit Team',
            excerpt: matterResult.data.excerpt || 'No description available',
            cover: matterResult.data.cover || null,
            category: matterResult.data.category || 'Uncategorized',
            // Flag whether image is external or local
            isExternalImage: isExternalUrl(matterResult.data.cover),
            // Include content images for potential display
            contentImages: contentImages.length > 0 ? contentImages : null,
            ...matterResult.data
          };
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          // Return a default post object if there's an error
          return {
            slug,
            title: `Error loading post: ${slug}`,
            date: new Date().toISOString(),
            author: 'Captrit Team',
            excerpt: 'There was an error loading this post.',
            cover: null,
            isExternalImage: false,
            contentImages: null,
            category: 'Uncategorized'
          };
        }
      })
      .filter(Boolean); // Remove any null entries from errors

    console.log(`Successfully processed ${allPostsData.length} blog posts`);
    
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error in getSortedPostsData:', error);
    return [];
  }
}

export function getAllCategories() {
  const allPosts = getSortedPostsData();
  // Extract all categories and remove duplicates
  const categories = ['All', ...new Set(allPosts.map(post => post.category || 'Uncategorized'))];
  return categories;
}

export function getAllPostSlugs() {
  console.log('Getting all post slugs from directory:', postsDirectory);
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist:', postsDirectory);
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    console.log('Found files for slugs:', fileNames);
    
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          params: {
            slug: fileName.replace(/\.md$/, ''),
          },
        };
      });
  } catch (error) {
    console.error('Error in getAllPostSlugs:', error);
    return [];
  }
}

export async function getPostData(slug) {
  console.log('Getting post data for slug:', slug);
  
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    console.log('Full path for post:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post file not found: ${fullPath}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    console.log('Parsed frontmatter for post:', slug, 'title:', matterResult.data.title);
    
    // Extract images from the markdown content
    const contentImages = extractImagesFromMarkdown(matterResult.content);

    // Use remark with default settings - avoid custom handlers that cause errors
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();
    console.log('Processed markdown content for post:', slug, 'HTML length:', contentHtml.length);

    // Combine the data with the slug and contentHtml, ensuring all required fields are present
    return {
      slug,
      contentHtml,
      title: matterResult.data.title || 'Untitled Post',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || 'Captrit Team',
      excerpt: matterResult.data.excerpt || 'No description available',
      cover: matterResult.data.cover || null,
      category: matterResult.data.category || 'Uncategorized',
      // Flag whether image is external or local
      isExternalImage: isExternalUrl(matterResult.data.cover),
      // Include content images for potential display
      contentImages: contentImages.length > 0 ? contentImages : null,
      ...matterResult.data
    };
  } catch (error) {
    console.error(`Error getting post data for slug ${slug}:`, error);
    // Return a default post object if there's an error
    return {
      slug,
      contentHtml: '<p>Sorry, there was an error loading this post.</p>',
      title: `Error loading post: ${slug}`,
      date: new Date().toISOString(),
      author: 'Captrit Team',
      excerpt: 'There was an error loading this post.',
      cover: null,
      isExternalImage: false,
      contentImages: null,
      category: 'Uncategorized'
    };
  }
} 