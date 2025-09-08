
export default async function handler(req, res) {
    const body = req.body;
  
    if (body.status === 2 && body.url) {
      console.log("Updated PPTX ready at:", body.url);
  
      // Download the updated PPTX and save it to your storage if needed
      // Example:
      // const updated = await fetch(body.url);
      // const buffer = await updated.arrayBuffer();
      // save buffer to S3/DB/etc.
    }
  
    res.status(200).json({ result: "OK" });
  }
  