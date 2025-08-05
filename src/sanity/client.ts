import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // Enable CDN for better performance
});

// Cache durations for different content types
export const CACHE_DURATIONS = {
  // Static content that rarely changes
  TAGS: 3600, // 1 hour
  SITE_CONFIG: 3600, // 1 hour
  
  // Content that changes occasionally
  PORTFOLIO: 300, // 5 minutes
  PRODUCTIONS: 300, // 5 minutes
  
  // Dynamic content
  POSTS: 120, // 2 minutes
  CATEGORIES: 120, // 2 minutes
} as const;

// Cache tags for targeted revalidation
export const CACHE_TAGS = {
  POSTS: 'posts',
  TAGS: 'tags',
  PORTFOLIO: 'portfolio',
  PRODUCTIONS: 'productions',
  CATEGORIES: 'categories',
  NAVIGATION: 'navigation',
} as const;

// Helper function to create fetch options with cache tags
export const createCacheOptions = (duration: number, tags: string[] = []) => ({
  next: { 
    revalidate: duration,
    tags 
  }
});