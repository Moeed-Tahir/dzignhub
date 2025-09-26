// Test script to verify Strapi blog integration
const fetch = require('node-fetch');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://rational-growth-935ad59588.strapiapp.com';

async function testBlogData() {
  console.log('🔍 Testing Strapi Blog Integration...\n');
  
  try {
    // Test blog page data endpoint
    console.log('📖 Testing blog page data...');
    const blogResponse = await fetch(
      `${STRAPI_URL}/api/blog-pages?populate[posts][populate][posts][populate][cover][populate]=*&populate[posts][populate][posts][populate][media][populate]=*&populate[posts][populate][posts][populate][quotes][populate]=*&populate[posts][populate][posts][populate][introduction][populate]=*&populate[posts][populate][posts][populate][conclusion][populate]=*`
    );
    
    if (!blogResponse.ok) {
      throw new Error(`Blog API returned ${blogResponse.status}`);
    }
    
    const blogData = await blogResponse.json();
    console.log('✅ Blog page data fetched successfully');
    console.log(`📊 Blog structure:`, JSON.stringify(blogData, null, 2));
    
    if (blogData.data && blogData.data.length > 0) {
      const blogPage = blogData.data[0];
      const postsComponent = blogPage.posts;
      
      console.log(`\n📝 Hero Title: ${postsComponent?.heroTitle || 'Not set'}`);
      console.log(`📝 Hero Subtitle: ${postsComponent?.heroSubtitle || 'Not set'}`);
      console.log(`📰 Number of posts: ${postsComponent?.posts?.length || 0}`);
      
      if (postsComponent?.posts && postsComponent.posts.length > 0) {
        console.log('\n📋 Posts structure:');
        postsComponent.posts.forEach((post, index) => {
          console.log(`\n  Post ${index + 1}:`);
          console.log(`    - Title: ${post.title || 'No title'}`);
          console.log(`    - Slug: ${post.slug || 'No slug'}`);
          console.log(`    - Description: ${post.description || 'No description'}`);
          console.log(`    - Author: ${post.author || 'No author'}`);
          console.log(`    - Publish Date: ${post.publishDate || 'No date'}`);
          console.log(`    - Categories: ${post.categories || 'No category'}`);
          console.log(`    - Cover: ${post.cover ? 'Yes' : 'No'}`);
          console.log(`    - Introduction: ${post.introduction ? 'Yes' : 'No'}`);
          console.log(`    - Quotes: ${post.quotes?.length || 0} quotes`);
          console.log(`    - Media: ${post.media?.length || 0} media items`);
          console.log(`    - Conclusion: ${post.conclusion ? 'Yes' : 'No'}`);
        });
      }
    } else {
      console.log('⚠️ No blog page data found');
    }
    
    // Test individual post fetch (if posts exist)
    if (blogData.data?.[0]?.posts?.posts?.[0]?.slug) {
      const testSlug = blogData.data[0].posts.posts[0].slug;
      console.log(`\n🔍 Testing individual post fetch for slug: ${testSlug}`);
      
      // This would use the same endpoint but filter by slug
      const posts = blogData.data[0].posts.posts;
      const post = posts.find(p => p.slug === testSlug);
      
      if (post) {
        console.log('✅ Individual post fetch simulation successful');
        console.log(`📖 Post title: ${post.title}`);
      } else {
        console.log('❌ Individual post not found');
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing blog data:', error.message);
    console.log('\n🔧 Troubleshooting suggestions:');
    console.log('1. Check if Strapi server is running');
    console.log('2. Verify STRAPI_URL environment variable');
    console.log('3. Ensure BlogPage collection exists in Strapi');
    console.log('4. Check if posts component is properly configured');
    console.log('5. Verify populate parameters match your Strapi schema');
  }
}

// Test slug generation logic
function testSlugGeneration() {
  console.log('\n🏷️ Testing slug generation logic...');
  
  const mockPosts = [
    { slug: 'article-1' },
    { slug: 'article-3' },
    { slug: 'custom-post' },
    { slug: 'article-5' }
  ];
  
  let highestNumber = 0;
  mockPosts.forEach(post => {
    if (post.slug && post.slug.startsWith('article-')) {
      const number = parseInt(post.slug.replace('article-', ''));
      if (!isNaN(number) && number > highestNumber) {
        highestNumber = number;
      }
    }
  });
  
  const nextSlug = `article-${highestNumber + 1}`;
  console.log(`✅ Next auto-generated slug would be: ${nextSlug}`);
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Strapi Blog Tests\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);
  
  await testBlogData();
  testSlugGeneration();
  
  console.log('\n✨ Tests completed!');
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { testBlogData, testSlugGeneration };