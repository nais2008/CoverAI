import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

import { DropZoneProps } from "../../models/FilesUploadPanel"

import VideFile from "../../assets/img/videFile.svg"

const VideoDropZone: React.FC<DropZoneProps<File | null>> = ({ onChange }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const videoFile = acceptedFiles[0]
      if (videoFile && videoFile.type.startsWith("video/")) {
        onChange(videoFile)
      } else {
        alert("Please upload a valid video file!")
        onChange(null)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
  })

  return (
    <div {...getRootProps()} className={`drop-zone ${isDragActive ? "active" : ""} video`}>
      <input {...getInputProps()} />
      <p>Drop File Video</p>
      <img src={VideFile} alt="" />
    </div>
  )
}

export default VideoDropZone
