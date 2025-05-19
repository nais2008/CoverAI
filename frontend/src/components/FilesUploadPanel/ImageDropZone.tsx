import React, {useRef, useState, useEffect } from "react"

import { DropZoneProps } from "../../models/FilesUploadPanel"

import ImgFile from "../../assets/img/imgFile.svg"

export const ImageDropZone: React.FC<DropZoneProps<File[]>> = ({ onChange }) => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    const newImgs = imageFiles.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    const updated = [...images, ...newImgs];
    setImages(updated);
    onChange(updated.map(({ file }) => file));
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  const onDragLeave = () => setIsDragActive(false);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const onButtonClick = () => inputRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onChange(updated.map(({ file }) => file));
  };

  useEffect(() => {
    return () => images.forEach(img => URL.revokeObjectURL(img.preview));
  }, [images]);

  return (
    <div
      className={`drop-zone img ${isDragActive ? "active" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onButtonClick}
    >
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        multiple
        accept="image/*"
        onChange={onFileChange}
      />
      {images.length === 0 ? (
        <>
          <p>Drop Images or Click to Upload</p>
          <img src={ImgFile} alt="Upload images icon" />
        </>
      ) : (
        <div className="preview-list">
          {images.map((img, idx) => (
            <div key={idx} className="preview-item">
              <img src={img.preview} alt={`preview-${idx}`} />
              <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeImage(idx); }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropZone
