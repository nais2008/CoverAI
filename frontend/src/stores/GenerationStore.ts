// frontend/src/stores/GenerationStore.ts
import { makeAutoObservable, runInAction } from "mobx";

interface GenerationResult {
    status: string;
    image_url: string; // e.g., /static/generated/image.png
}

// Define this in your .env file for your React app (e.g., .env.development or .env.local)
// REACT_APP_BACKEND_URL=http://localhost:8000
const BACKEND_URL = "http://127.0.0.1:8081";


class GenerationStore {
    isLoading = false;
    generatedImageUrl: string | null = null;
    error: string | null = null;
    isInitialUploadComplete = false; // To manage view switch in ChatPage

    constructor() {
        makeAutoObservable(this);
    }

    async generateImage(video: File, text: string) {
        runInAction(() => {
            this.isLoading = true;
            this.error = null;
            this.generatedImageUrl = null;
            // isInitialUploadComplete will be set after this call is successfully initiated
        });

        const formData = new FormData();
        formData.append("video", video);
        formData.append("text", text);

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/generate`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { detail: "Unknown error structure from server." };
                }
                console.error("Server error response:", errorData);
                throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
            }

            const result: GenerationResult = await response.json();

            runInAction(() => {
                if (result.status === "success" && result.image_url) {
                    this.generatedImageUrl = `${BACKEND_URL}${result.image_url}`; // Full URL for the image
                } else {
                    this.error = "Generation failed or image URL not provided by the server.";
                }
                this.isLoading = false;
            });
        } catch (err: any) {
            console.error("Generation API call error:", err);
            runInAction(() => {
                this.error = err.message || "An unknown error occurred during image generation.";
                this.isLoading = false;
            });
        }
    }

    resetState() {
        this.isLoading = false;
        this.generatedImageUrl = null;
        this.error = null;
        this.isInitialUploadComplete = false;
    }

    setInitialUploadComplete(status: boolean) {
        this.isInitialUploadComplete = status;
    }
}

const generationStore = new GenerationStore();
export default generationStore;
