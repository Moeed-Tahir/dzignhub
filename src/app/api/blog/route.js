import { fetchBlogPageData, fetchBlogPostBySlug } from "@/utils/strapi";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;

  try {
    if (slug) {
      // Fetch specific blog post by slug
      const post = await fetchBlogPostBySlug(slug);
      
      if (!post) {
        return NextResponse.json({ 
          success: false, 
          error: 'Post not found' 
        }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        post 
      });
    } else {
      // Fetch all blog posts with pagination
      const blogData = await fetchBlogPageData();
      const posts = blogData.posts || [];
      
      // Calculate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = posts.slice(startIndex, endIndex);
      
      const totalPages = Math.ceil(posts.length / limit);
      
      return NextResponse.json({ 
        success: true,
        data: {
          heroTitle: blogData.heroTitle,
          heroSubtitle: blogData.heroSubtitle,
          posts: paginatedPosts,
          pagination: {
            currentPage: page,
            totalPages,
            totalPosts: posts.length,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        }
      });
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch blog data' 
    }, { status: 500 });
  }
}