// frontend/src/pages/ChatPage/ChatPage.tsx
import React from "react";
import { observer } from 'mobx-react-lite';
import generationStore from "../../stores/GenerationStore";
import FilesUploadPanel from "../../components/FilesUploadPanel"; // Ensure this path is correct
import GenerationResultDisplay from "../../components/GenerationResultDisplay/GenerationResultDisplay";
// import Chat from "../../components/Chat"; // Original Chat component, its role needs clarification here

// Assuming ChatPage is structured like this:
// src/pages/ChatPage/ChatPage.tsx
// components/UploadForm/UploadForm.tsx
// components/GenerationResultDisplay/GenerationResultDisplay.tsx
// stores/GenerationStore.ts

export const ChatPage: React.FC = observer(() => {
  const handleUploadFlowSubmit = () => {
    // This function is called from FilesUploadPanel.
    // It signals that the user has submitted the form.
    // The store's isInitialUploadComplete is set to true within FilesUploadPanel's handleSubmit
    // or can be set here if preferred.
    // The actual API call is initiated from FilesUploadPanel.
    // This primarily handles the view switch logic.
    if (!generationStore.isInitialUploadComplete) { // Defensive check
        generationStore.setInitialUploadComplete(true);
    }
  };

  const handleStartOver = () => {
    generationStore.resetState(); // This will set isInitialUploadComplete to false
  };

  return (
    <div className="chat-page-container"> {/* Added a wrapper for potential global styling */}
      {!generationStore.isInitialUploadComplete ? (
        <FilesUploadPanel
          onUploadSubmit={handleUploadFlowSubmit}
          className="isChatPage" // Keep existing class if used for styling
        />
      ) : (
        <>
          <GenerationResultDisplay />
          {/* Show "Generate Another" button only if not loading and there's a result or an error */}
          {(!generationStore.isLoading && (generationStore.generatedImageUrl || generationStore.error)) && (
            <div style={{ textAlign: 'center', marginTop: '25px', paddingBottom: '20px' }}>
              <button
                onClick={handleStartOver}
                className="btn btn-primary" /* Use your app's button styling */
                style={{padding: '12px 25px', fontSize: '1.1em'}}
              >
                Create Another
              </button>
            </div>
          )}
        </>
      )}
      {/* If the <Chat /> component is meant to be part of this page always or conditionally, integrate here.
          For example, if Chat is for follow-up messages after generation:
          {generationStore.generatedImageUrl && <Chat initialMessage="Here's your generated image!" />}
      */}
    </div>
  );
});

export default ChatPage;
