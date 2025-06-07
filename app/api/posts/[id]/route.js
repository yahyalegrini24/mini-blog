import { prisma } from '../../../../lib/prisma';  // Use named import

export async function GET(request, { params }) {
  try {
    // Convert id to number
    const postId = Number(params.id);
    
    if (isNaN(postId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid post ID' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return new Response(
        JSON.stringify({ error: 'Post not found' }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(post), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}