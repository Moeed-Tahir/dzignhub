
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { fileUrl, fileName } = req.query;

  const config = {
    document: {
      fileType: "pptx",
      key: Date.now().toString(),
      title: fileName,
      url: fileUrl,
      permissions: {
        edit: true,
        download: true,
        review: true,
        comment: true,
      },
    },
    editorConfig: {
      mode: "edit",
      lang: "en",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/save`,
      user: {
        id: "user-1",
        name: "User",
      },
    },
    type: "desktop",
  };

  const token = jwt.sign(config, process.env.DOC_SERVER_SECRET, {
    expiresIn: "1h",
  });

  config.token = token;

  res.json({ config });
}
