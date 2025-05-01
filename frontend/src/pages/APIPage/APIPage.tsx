import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2"

import CodeExample from "./components/CodeExemple";
import Tabs from "./components/Tabs";


import "codemirror/lib/codemirror.css"
import "codemirror/theme/dracula.css"

import "./APIPAge.scss"

export const APIPage = () => {
  const [language, setLanguage] = React.useState("python"); // Default language

  const handleTabClick = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className="documentation">
      <h1>API Documentation</h1>
      <Tabs onTabClick={handleTabClick} />
      <div className="content">
        <h2>API Endpoint</h2>
        <p>
          This API allows you to generate video covers based on an audio track
          from the video.
        </p>
        <h3>Endpoint</h3>
        <pre>POST /api/v1/generate/cover</pre>
        <h3>Headers</h3>
        <pre>
          Authorization: Bearer YOUR_API_KEY
        </pre>
        <h3>Request Body</h3>
        <CodeMirror
          value={
            `{
  "video": "file",     // Video file to generate cover for
  "audio": "file",     // Audio file extracted from the video
  "text": "string",    // Optional text for customization
  "image": "file"      // Optional image for customization
}`
          }
          options={{
            mode: "json",
            theme: "dracula",
            lineNumbers: true,
            readOnly: true,
          }}
        />

        <h3>Response</h3>
        <CodeMirror
          value={
            `{
    "cover_url": "string",   // URL to the generated video cover image
    "status": "success"
}`
          }
          options={{
            mode: "json",
            theme: "dracula",
            lineNumbers: true,
            readOnly: true,
          }}
        />

        <h3>Example Usage</h3>
        <CodeExample language={language} />
      </div>
    </div>
  )
}

export default APIPage
