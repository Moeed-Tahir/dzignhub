"use client";
import { useEffect, useState } from "react";
import {DocumentEditor} from "@onlyoffice/document-editor-react";
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function Page() {
  const [config, setConfig] = useState(null);
  const searchParams = useSearchParams();
  const slideUrl = searchParams.get("slideUrl");
  useEffect(() => {
    async function fetchConfig() {
      // const pptUrl =
      //   "https://qnlscpmwamswjhhoorwt.supabase.co/storage/v1/object/public/allmyai-content/enkodex_final_year_project_20250904164514.pptx";
      if (!slideUrl) return;
       const pptUrl =  slideUrl;
       const title = slideUrl.split("/").pop().split(".")[0];

      const res = await fetch(
        `/api/editor?fileUrl=${encodeURIComponent(pptUrl)}&fileName=${title}.pptx`
      );
      const data = await res.json();
      setConfig(data.config);
    }
    fetchConfig();
  }, []);

  if (!config) return <p>Loading editor...</p>;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DocumentEditor
        id="docEditor"
        documentServerUrl={process.env.NEXT_PUBLIC_DOC_SERVER_ADDRESS} // your Docs Cloud or self-hosted server
        config={config}
        type="desktop"
        events_onDocumentReady={() => console.log("Document ready")}
        events_onError={(err) => console.error("Editor error:", err)}
      />
    </div>
  );
}

