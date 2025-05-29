import React, { useState } from "react";
import VideoDropZone from "./VideoDropZone";
import ImageDropZone from "./ImageDropZone";
import TextInput from "./TextInput";

import { FormData } from "../../types/FilesUploadPanel";

import "./FilesUploadPanel.scss";

import arrow from "../../assets/img/arrow.svg"

interface UploadFormProps {
  onSubmit: (data: FormData) => void;
  className?: string
}

export const FilesUploadPanel: React.FC<UploadFormProps> = ({ onSubmit, className }) => {
  const [video, setVideo] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    if (!video) {
      alert("Please upload a video!");
      return;
    }
    onSubmit({ video, images, text });
  };

  return (
    <div className={`upload-form-container ${ className }`}>
      <div className="upload-form">
        <VideoDropZone onChange={setVideo} />
        {/* <ImageDropZone onChange={setImages} /> */}
        <div className="text-input-wrapper">
          <TextInput onTextChange={setText} />
          <button onClick={handleSubmit} className="submit-button">
            <img src={arrow} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilesUploadPanel;
