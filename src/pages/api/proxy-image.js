export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }
  
    try {
      // Fetch the image from external URL
      const response = await fetch(decodeURIComponent(url));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
  
      const imageBuffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
  
      // Set appropriate headers
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.setHeader('Content-Length', imageBuffer.byteLength);
  
      // Send the image
      res.status(200).send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error('Error proxying image:', error);
      res.status(500).json({ error: 'Failed to proxy image' });
    }
  }