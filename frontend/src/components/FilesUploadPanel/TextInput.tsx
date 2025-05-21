// frontend/src/components/UploadForm/TextInput.tsx
import React from "react"

import { TextInputProps } from "../../types/FilesUploadPanel"

const TextInput: React.FC<TextInputProps> = ({ onTextChange }) => {
  return (
    <textarea
      placeholder="Ask CoverAI Anything..."
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onTextChange(e.target.value)}
      className="text-input"
    />
  )
}

export default TextInput;
