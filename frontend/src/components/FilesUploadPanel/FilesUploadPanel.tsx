// frontend/src/components/UploadForm/UploadForm.tsx
import React, { useState } from "react";
import { observer } from 'mobx-react-lite'; // Import observer
import VideoDropZone from "./VideoDropZone";
import TextInput from "./TextInput";
import generationStore from "../../stores/GenerationStore"; // Import the store

import "./FilesUploadPanel.scss";
import arrow from "../../assets/img/arrow.svg";

interface UploadFormProps {
  onUploadSubmit: () => void; // Callback to notify parent (ChatPage) to potentially switch view
  className?: string;
}

export const FilesUploadPanel: React.FC<UploadFormProps> = observer(({ onUploadSubmit, className }) => {
  const [video, setVideo] = useState<File | null>(null);
  const [text, setText] = useState<string>("");

  const handleSubmit = async () => {
    if (!video) {
      alert("Please upload a video!");
      return;
    }

    // Set that an upload attempt is being made.
    // The store will handle the isLoading state for the API call itself.
    generationStore.setInitialUploadComplete(true);
    onUploadSubmit(); // Notify ChatPage to switch view to result/loading display area

    // Call the store action to start generation
    await generationStore.generateImage(video, text);

    // If there was an immediate issue before even trying to call generateImage,
    // or if you want to revert onUploadSubmit if generateImage is not called, handle here.
    // For now, we switch view and let GenerationResultDisplay show loading/error from the store.
  };

  return (
    <div className={`upload-form-container ${className}`}>
      <div className="upload-form">
        <VideoDropZone onChange={setVideo} />
        <div className="text-input-wrapper">
          <TextInput onTextChange={setText} />
          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={!video || generationStore.isLoading} // Disable if no video or already loading
          >
            {generationStore.isLoading ? (
              <span className="loading-spinner-button"></span> /* Basic spinner, style it in SCSS */
            ) : (
              <img src={arrow} alt="Submit" />
            )}
          </button>
        </div>
      </div>
      {generationStore.isLoading && <p className="sr-only" aria-live="polite">Generation in progress.</p>}
    </div>
  );
});

export default FilesUploadPanel;
