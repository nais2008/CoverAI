import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2"

import "codemirror/mode/javascript/javascript"
import "codemirror/mode/python/python"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/dracula.css"

const pythonCode = `import requests

url = "https://coverai.ru/api/v1/generate/cover"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
files = {
    "video": open("video.mp4", "rb"),
    "audio": open("audio.mp3", "rb"),
    "text": "Optional text for customization",
}

response = requests.post(url, headers=headers, files=files)

if response.status_code == 200:
    print(response.json())`;

const jsCode = `const formData = new FormData();
formData.append("video", document.getElementById('video-input').files[0]);
formData.append("audio", document.getElementById('audio-input').files[0]);
formData.append("text", "Optional text for customization");

fetch("https://coverai.ru/api/v1/generate/cover", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log(data);
});`;

interface ICodeExemple {
  language: string
}

const CodeExample: React.FC<ICodeExemple> = ({ language }) => {
  let code;
  if (language === "python") {
    code = pythonCode;
  } else if (language === "javascript") {
    code = jsCode;
  }

  return (
    <div className="code-example">
      <CodeMirror
        value={code}
        options={{
          mode: language === "python" ? "python" : "javascript",
          theme: "dracula",
          lineNumbers: true,
          readOnly: true,
          scroll: false,
        }}
      />
    </div>
  );
};

export default CodeExample;
