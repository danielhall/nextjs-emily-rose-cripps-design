import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// This webhook will be called by Sanity when content changes
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Verify webhook signature (optional but recommended)
    // const signature = req.headers.get('sanity-webhook-signature');
    
    // You can add signature verification here if needed
    // const isValid = verifySignature(body, signature, process.env.SANITY_WEBHOOK_SECRET);
    // if (!isValid) {
    //   return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    // }

    // Get the document type that was updated
    const { _type } = body;

    // Revalidate relevant paths based on content type
    switch (_type) {
      case 'post':
        // Revalidate portfolio and category pages
        await Promise.all([
          revalidateTag('posts'),
          revalidateTag('portfolio'),
          revalidateTag('categories')
        ]);
        break;
        
      case 'tag':
        // Revalidate tag-related content
        await Promise.all([
          revalidateTag('tags'),
          revalidateTag('categories'),
          revalidateTag('navigation')
        ]);
        break;
        
      case 'job':
        // Revalidate productions
        await Promise.all([
          revalidateTag('productions'),
          revalidateTag('posts')
        ]);
        break;
        
      default:
        // Revalidate everything for unknown types
        await Promise.all([
          revalidateTag('posts'),
          revalidateTag('tags'),
          revalidateTag('portfolio'),
          revalidateTag('productions'),
          revalidateTag('categories'),
          revalidateTag('navigation')
        ]);
    }

    return NextResponse.json({ 
      message: 'Cache revalidated successfully',
      type: _type 
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}
