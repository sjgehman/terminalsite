import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContent(filename: string): string {
  const fullPath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return fileContents;
}

export function getAbout(): string {
  return getContent('about.md');
}

export function getResume(): string {
  return getContent('resume.md');
}

export function getContact(): string {
  return getContent('contact.md');
}

export function getProjects(): string {
  return getContent('projects.md');
}
