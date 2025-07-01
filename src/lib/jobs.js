import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const jobsDirectory = path.join(process.cwd(), 'src/content/jobs');

export function getSortedJobsData() {
  // Get file names under /jobs
  const fileNames = fs.readdirSync(jobsDirectory);
  const allJobsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(jobsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
        content: matterResult.content,
      };
    });

  // Sort jobs by date
  return allJobsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllJobIds() {
  const fileNames = fs.readdirSync(jobsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getJobData(id) {
  const fullPath = path.join(jobsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    content: contentHtml,
    ...matterResult.data,
  };
}

export function getAllJobCategories() {
  const allJobsData = getSortedJobsData();
  const categories = new Set(allJobsData.map(job => job.category).filter(Boolean));
  return ['All', ...Array.from(categories)];
}

export function getJobsByCategory(category) {
  const allJobsData = getSortedJobsData();
  return allJobsData.filter(job => job.category === category);
}

export function getJobsByLocation(location) {
  const allJobsData = getSortedJobsData();
  return allJobsData.filter(job => job.location === location);
} 