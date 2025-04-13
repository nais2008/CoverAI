import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import { DropZoneProps } from "../../models/FilesUploadPanel"

import ImgFile from "../../assets/img/imgFile.svg"

const ImageDropZone: React.FC<DropZoneProps<File[]>> = ({ onChange }) => {
  const [localImages, setLocalImages] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFiles = acceptedFiles.filter((file) => file.type.startsWith("image/"))
      const updatedImages = [...localImages, ...imageFiles]
      setLocalImages(updatedImages)
      onChange(updatedImages);
    },
    [localImages, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  })

  return (
    <div {...getRootProps()} className={`drop-zone ${isDragActive ? "active" : ""} img`}>
      <input {...getInputProps()} />
      <p>Drop Images</p>
      <img src={ImgFile} alt="" />
    </div>
  )
}

export default ImageDropZone
