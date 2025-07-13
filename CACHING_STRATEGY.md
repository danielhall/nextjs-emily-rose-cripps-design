# Sanity CMS Caching Strategy

This document outlines the comprehensive caching strategy implemented to optimize performance and respect Sanity API limits.

## Overview

The caching strategy uses multiple layers:
1. **Sanity CDN** - For faster content delivery
2. **Next.js ISR (Incremental Static Regeneration)** - For page-level caching
3. **Cache Tags** - For targeted cache invalidation
4. **Webhook-based Revalidation** - For real-time updates

## Cache Durations

### Static Content (1 hour)
- **Tags**: Category/tag definitions that rarely change
- **Site Config**: Global settings and configuration

### Semi-Static Content (5 minutes)
- **Portfolio**: Main portfolio listings
- **Productions**: Production/job listings

### Dynamic Content (2 minutes)
- **Posts**: Individual project posts
- **Categories**: Filtered category pages

## Cache Tags

Each query is tagged for targeted invalidation:

- `posts` - Individual project posts
- `tags` - Category/tag definitions
- `portfolio` - Portfolio page content
- `productions` - Productions page content
- `categories` - Category filter pages
- `navigation` - Navigation dropdown content

## Webhook Integration

### Setup in Sanity Studio

1. Go to your Sanity project dashboard
2. Navigate to API → Webhooks
3. Create a new webhook with:
   - **URL**: `https://yourdomain.com/api/revalidate`
   - **Dataset**: `production`
   - **HTTP method**: `POST`
   - **API version**: `2024-01-01`
   - **Include drafts**: `false`

### Webhook Events

The webhook responds to content changes and revalidates relevant cache tags:

- **Post changes**: Revalidates `posts`, `portfolio`, `categories`
- **Tag changes**: Revalidates `tags`, `categories`, `navigation`
- **Job changes**: Revalidates `productions`, `posts`

## API Limit Management

### Current Settings
- **CDN Enabled**: Reduces direct API calls
- **Reasonable Cache Times**: Balances freshness with API usage
- **Targeted Revalidation**: Only invalidates relevant content

### Monitoring
- Monitor API usage in Sanity dashboard
- Adjust cache durations if approaching limits
- Consider upgrading plan if needed

## Performance Benefits

1. **Faster Page Loads**: ISR serves cached pages instantly
2. **Reduced API Calls**: CDN and caching minimize requests
3. **Real-time Updates**: Webhooks ensure content freshness
4. **SEO Friendly**: Static generation improves crawling

## Environment Variables (Optional)

For webhook signature verification:

```env
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

## Testing Cache Behavior

### Development
```bash
npm run dev
```
Cache is disabled in development for better DX.

### Production
```bash
npm run build && npm start
```
Full caching behavior is active.

### Manual Revalidation
You can manually trigger revalidation:
```bash
curl -X POST https://yourdomain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"_type": "post"}'
```

## Best Practices

1. **Content Strategy**: Plan content updates during low-traffic periods
2. **Cache Warming**: After major updates, visit key pages to warm cache
3. **Monitoring**: Keep an eye on API usage and page performance
4. **Testing**: Always test caching behavior in production-like environment

## Troubleshooting

### Cache Not Updating
1. Check webhook configuration in Sanity
2. Verify webhook endpoint is accessible
3. Check Next.js logs for revalidation errors

### High API Usage
1. Increase cache durations
2. Verify CDN is enabled
3. Check for unnecessary client-side fetching

### Performance Issues
1. Monitor cache hit rates
2. Optimize GROQ queries
3. Consider image optimization settings
