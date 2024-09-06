"use client";
import React from "react";
import { DocumentViewer } from "react-documents";

export default function PreviewDoc() {
  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <DocumentViewer className="h-screen" queryParams="hl=Nl" url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
    </div>
  );
}

