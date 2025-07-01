import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import crypto from 'crypto';

const jobsDirectory = path.join(process.cwd(), 'jobs');

// Helper function to check if a URL is external
export function isExternalUrl(url) {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
}

// Generate a 6-digit job ID based on the slug
function generateJobId(slug) {
  // Create a hash of the slug to ensure the same slug always gets the same ID
  const hash = crypto.createHash('md5').update(slug).digest('hex');
  // Take the first 6 chars from the hash and convert to a number
  const numericHash = parseInt(hash.substring(0, 6), 16);
  // Ensure it's exactly 6 digits by modulo and padding
  const sixDigitId = String(numericHash % 1000000).padStart(6, '0');
  return sixDigitId;
}

export function getSortedJobsData() {
  console.log('Getting sorted jobs data from directory:', jobsDirectory);
  
  try {
    // Check if directory exists
    if (!fs.existsSync(jobsDirectory)) {
      console.error('Jobs directory does not exist:', jobsDirectory);
      return [];
    }
    
    // Get file names under /jobs
    const fileNames = fs.readdirSync(jobsDirectory);
    console.log('Found files in jobs directory:', fileNames);
    
    if (fileNames.length === 0) {
      console.log('No files found in jobs directory');
      return [];
    }
    
    const allJobsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');
        console.log('Processing job file:', fileName, 'with slug:', slug);

        try {
          // Read markdown file as string
          const fullPath = path.join(jobsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');

          // Use gray-matter to parse the job metadata section
          const matterResult = matter(fileContents);
          console.log('Parsed frontmatter for job:', slug, 'title:', matterResult.data.title);

          // Generate a 6-digit ID for the job
          const jobId = generateJobId(slug);

          // Combine the data with the slug and ensure all required fields exist
          return {
            id: jobId,
            slug,
            title: matterResult.data.title || 'Untitled Job',
            date: matterResult.data.date || new Date().toISOString(),
            location: matterResult.data.location || 'Remote',
            department: matterResult.data.department || 'General',
            status: matterResult.data.status || 'Open', // 'Open' or 'Closed'
            type: matterResult.data.type || 'Full-time',
            excerpt: matterResult.data.excerpt || 'No description available',
            salary: matterResult.data.salary || 'Competitive',
            requirements: matterResult.data.requirements || [],
            cover: matterResult.data.cover || null,
            isExternalImage: isExternalUrl(matterResult.data.cover),
            ...matterResult.data
          };
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          // Return a default job object if there's an error
          const jobId = generateJobId(slug);
          return {
            id: jobId,
            slug,
            title: `Error loading job: ${slug}`,
            date: new Date().toISOString(),
            location: 'Unknown',
            department: 'Unknown',
            status: 'Unknown',
            type: 'Unknown',
            excerpt: 'There was an error loading this job.',
            salary: 'Unknown',
            requirements: [],
            cover: null,
            isExternalImage: false
          };
        }
      })
      .filter(Boolean); // Remove any null entries from errors

    console.log(`Successfully processed ${allJobsData.length} job listings`);
    
    // Sort jobs by date (newest first) and then by status (open first)
    return allJobsData.sort((a, b) => {
      // First sort by status - Open jobs first
      if (a.status === 'Open' && b.status !== 'Open') return -1;
      if (a.status !== 'Open' && b.status === 'Open') return 1;
      
      // Then sort by date
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error in getSortedJobsData:', error);
    return [];
  }
}

export function getAllJobDepartments() {
  const allJobs = getSortedJobsData();
  // Extract all departments and remove duplicates
  const departments = ['All', ...new Set(allJobs.map(job => job.department || 'General'))];
  return departments;
}

export function getAllJobLocations() {
  const allJobs = getSortedJobsData();
  // Extract all locations and remove duplicates
  const locations = ['All', ...new Set(allJobs.map(job => job.location || 'Remote'))];
  return locations;
}

export function getAllJobTypes() {
  const allJobs = getSortedJobsData();
  // Extract all job types and remove duplicates
  const types = ['All', ...new Set(allJobs.map(job => job.type || 'Full-time'))];
  return types;
}

export function getAllJobSlugs() {
  console.log('Getting all job slugs from directory:', jobsDirectory);
  
  try {
    if (!fs.existsSync(jobsDirectory)) {
      console.error('Jobs directory does not exist:', jobsDirectory);
      return [];
    }
    
    const fileNames = fs.readdirSync(jobsDirectory);
    console.log('Found files for job slugs:', fileNames);
    
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const jobId = generateJobId(slug);
        return {
          params: {
            id: jobId,
          },
        };
      });
  } catch (error) {
    console.error('Error in getAllJobSlugs:', error);
    return [];
  }
}

export async function getJobData(idOrSlug) {
  console.log('Getting job data for ID or slug:', idOrSlug);
  
  try {
    // Get all jobs data to find the job by ID
    const allJobs = getSortedJobsData();
    
    // First check if this is an ID
    let job = allJobs.find(job => job.id === idOrSlug);
    
    // If not found by ID, try using it as a slug
    if (!job) {
      // Try direct slug access
      const fullPath = path.join(jobsDirectory, `${idOrSlug}.md`);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const slug = idOrSlug;
        const jobId = generateJobId(slug);
        
        // Use remark with default settings - avoid custom handlers that cause errors
        const processedContent = await remark()
          .use(html, { sanitize: false })
          .process(matterResult.content);
        
        const contentHtml = processedContent.toString();
        
        return {
          id: jobId,
          slug,
          contentHtml,
          title: matterResult.data.title || 'Untitled Job',
          date: matterResult.data.date || new Date().toISOString(),
          location: matterResult.data.location || 'Remote',
          department: matterResult.data.department || 'General',
          status: matterResult.data.status || 'Open',
          type: matterResult.data.type || 'Full-time',
          excerpt: matterResult.data.excerpt || 'No description available',
          salary: matterResult.data.salary || 'Competitive',
          requirements: matterResult.data.requirements || [],
          cover: matterResult.data.cover || null,
          isExternalImage: isExternalUrl(matterResult.data.cover),
          ...matterResult.data
        };
      }
      
      throw new Error(`Job not found with ID or slug: ${idOrSlug}`);
    }
    
    // Get the full job data using the slug
    const fullPath = path.join(jobsDirectory, `${job.slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    // Use remark with default settings
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();
    
    // Return full job data
    return {
      ...job,
      contentHtml
    };
  } catch (error) {
    console.error(`Error getting job data for ${idOrSlug}:`, error);
    // If it might be a slug, try to create a minimal valid response
    try {
      const jobId = generateJobId(idOrSlug);
      return {
        id: jobId,
        slug: idOrSlug,
        contentHtml: '<p>Sorry, there was an error loading this job.</p>',
        title: `Error loading job: ${idOrSlug}`,
        date: new Date().toISOString(),
        location: 'Unknown',
        department: 'Unknown',
        status: 'Unknown',
        type: 'Unknown',
        excerpt: 'There was an error loading this job.',
        salary: 'Unknown',
        requirements: [],
        cover: null,
        isExternalImage: false
      };
    } catch (e) {
      return null;
    }
  }
} 