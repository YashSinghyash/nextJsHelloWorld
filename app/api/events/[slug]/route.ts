import connectToDatabase from '@/lib/mongodb';
import Event from '@/database/event.model';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Type definition for route parameters
 * Ensures type safety for dynamic route segments
 */
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 * 
 * @param req - Next.js request object
 * @param context - Route context containing dynamic parameters
 * @returns JSON response with event data or error message
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectToDatabase();

    // Extract and validate slug parameter (await params in Next.js 15+)
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Validate slug format (basic validation)
    if (typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json(
        { message: 'Invalid slug format' },
        { status: 400 }
      );
    }

    // Query event by slug
    const event = await Event.findOne({ slug: slug.toLowerCase().trim() });

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found', slug },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      {
        message: 'Event fetched successfully',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (use proper logging in production)
    console.error('Error fetching event by slug:', error);

    // Return generic error response
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
