import React, { useState, useRef } from "react"
import { IoIosClose } from "react-icons/io"

import { DropZoneProps } from "../../types/FilesUploadPanel"

import VideFile from "../../assets/img/videFile.svg"

export const VideoDropZone: React.FC<DropZoneProps<File | null>> = ({ onChange }) => {
  const [video, setVideo] = useState<{ file: File; preview: string } | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      const preview = URL.createObjectURL(file);
      setVideo({ file, preview });
      onChange(file);
    } else {
      alert("Please upload a valid video file!");
      setVideo(null);
      onChange(null);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  const onDragLeave = () => setIsDragActive(false);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  };

  const onButtonClick = () => inputRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const removeVideo = () => {
    if (video) {
      URL.revokeObjectURL(video.preview);
      setVideo(null);
      onChange(null);
    }
  };

  return (
    <div
      className={`drop-zone video ${isDragActive ? "active" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onButtonClick}
    >
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept="video/*"
        onChange={onFileChange}
      />
      {video === null ? (
        <>
          <p>Drop Video or Click to Upload</p>
          <img src={VideFile} alt="Upload video icon" />
        </>
      ) : (
        <div className="preview-list">
          <div className="preview-item">
            <video src={video.preview} muted preload="metadata"></video>
            <div className="video-overlay">▶</div>
            <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeVideo(); }}><IoIosClose /></button>
          </div>
        </div>
      )}
    </div>
  );
};



export default VideoDropZone
