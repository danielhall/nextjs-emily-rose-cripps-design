import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { type SanityDocument } from "next-sanity";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get('offset') || '0');
  const limit = 20;

  try {
    const POSTS_QUERY = `*[
      _type == "post"
      && defined(slug.current)
    ]|order(_updatedAt desc, publishedAt desc)[${offset}...${offset + limit}]{
      _id, 
      title, 
      slug, 
      image, 
      publishedAt, 
      description, 
      _updatedAt
    }`;

    const COUNT_QUERY = `count(*[
      _type == "post"
      && defined(slug.current)
    ])`;

    const [posts, totalCount] = await Promise.all([
      client.fetch<SanityDocument[]>(POSTS_QUERY),
      client.fetch<number>(COUNT_QUERY)
    ]);
    
    const masonryPosts = posts
      ? posts.map((i: SanityDocument) => (i ? { 
          id: i._id, 
          name: i.title, 
          image: urlFor(i.image)?.width(500).url()?.toString(), 
          url: i.slug.current,
          description: i.description
        } : null)).filter((item): item is { id: string, name: string, image: string, url: string, description: string } => !!item)
      : [];

    const hasMore = offset + posts.length < totalCount;

    return NextResponse.json({ 
      posts: masonryPosts,
      hasMore,
      totalCount,
      currentCount: offset + posts.length
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
