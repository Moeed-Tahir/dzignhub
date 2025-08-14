"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchBlogPageData } from "@/utils/strapi";

function page() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectToSlugBasedUrl = async () => {
      try {
        // Try to get blog data and find the post by index
        const blogData = await fetchBlogPageData();
        
        if (blogData.posts && blogData.posts.length > 0) {
          const postIndex = parseInt(id) - 1; // Convert 1-based to 0-based index
          const post = blogData.posts[postIndex];
          
          if (post && post.slug) {
            // Redirect to the new slug-based URL
            router.replace(`/blog/${post.slug}`);
            return;
          }
        }
        
        // If no matching post found, redirect to blog page
        router.replace('/blog');
        
      } catch (error) {
        console.error('Error redirecting:', error);
        router.replace('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      redirectToSlugBasedUrl();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to the updated blog page...</p>
        </div>
      </div>
    );
  }

  return null;
}

export default page;
