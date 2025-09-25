import { generateBlogSlug } from "@/utils/strapi";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newSlug = await generateBlogSlug();
    
    return NextResponse.json({ 
      success: true, 
      slug: newSlug 
    });
  } catch (error) {
    console.error('Error generating slug:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to generate slug',
      slug: `article-${Date.now()}` // Fallback slug
    }, { status: 500 });
  }
}

export async function POST() {
  // This could be extended to accept custom slug preferences
  // or validate slug uniqueness
  return GET();
}