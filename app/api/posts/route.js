import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Add more detailed logging
    console.log('POST request received');
    
    let body;
    try {
      body = await req.json();
      console.log('Request body:', body);
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { title, content, image, imagePublicId } = body;

    // Validate required fields
    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Content is required' },
        { status: 400 }
      );
    }

    // Create post data object
    const postData = {
      title: title.trim(),
      content: content.trim(),
    };

    // Add image fields if they exist
    if (image) {
      postData.image = image;
    }
    
    if (imagePublicId) {
      postData.imagePublicId = imagePublicId;
    }

    console.log('Creating post with data:', postData);

    const newPost = await prisma.post.create({
      data: postData,
    });

    console.log('Post created successfully:', newPost);

    return NextResponse.json({
      success: true,
      post: newPost
    });
    
  } catch (error) {
    console.error('Failed to create post - Full error:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to create post',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}