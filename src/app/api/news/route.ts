import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Service role client for admin operations (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// GET all news posts (only published for public, all for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    // Use admin client if including unpublished (for admin panel)
    const client = includeUnpublished ? supabaseAdmin : supabase;

    let query = client
      .from('news_posts')
      .select('*');

    // Only show published, non-deleted posts on public site
    if (!includeUnpublished) {
      query = query.eq('published', true).eq('deleted', false);
    } else if (!includeDeleted) {
      // Admin panel but exclude deleted
      query = query.eq('deleted', false);
    }

    const { data, error } = await query
      .order('is_pinned', { ascending: false, nullsFirst: false })
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ posts: [], error: error.message }, { status: 200 });
    }

    console.log('GET /api/news - returning posts:', data?.length || 0);
    return NextResponse.json({ posts: data || [] });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ posts: [], error: error.message || 'Unknown error' }, { status: 200 });
  }
}

// POST new news post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating post with data:', body);
    
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      console.error('No authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use admin client to bypass RLS for authenticated operations
    const { data, error } = await supabaseAdmin
      .from('news_posts')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    console.log('Post created successfully:', data);
    return NextResponse.json({ post: data });
  } catch (error: any) {
    console.error('POST /api/news error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update news post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('news_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ post: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE news post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('news_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

