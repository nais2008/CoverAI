
# API Documentation: CoverAI

CoverAI is an AI service that generates video covers based on the audio extracted from the video file provided by the user. The service is paid and can be used in both personal and commercial projects.

## Base URL

```curl
https://coverai.ru/api/v1
```

## Authentication

To use the API, you must include an `api_key` in the request header for authentication.

### Example Header

```header
Authorization: Bearer <your_api_key>
```

## Endpoints

### 1. **Generate Video Cover**

Generate a cover for a video based on the extracted audio, user-provided text, and images.

- **URL:** `/generate_cover`
- **Method:** `POST`
- **Request Body:**
  - `video`: (required) The video file that will be processed (MP4, AVI, etc.).
  - `user_text`: (optional) Text that the user wants to appear on the cover.
  - `images`: (optional) Array of image files that the user wants to include in the cover.

#### Example Request

```json
{
  "video": "data:video/mp4;base64,YourBase64EncodedVideoData",
  "user_text": "This is a video cover",
  "images": [
    "data:image/jpeg;base64,YourBase64EncodedImageData"
  ]
}
```

#### Example cURL

```bash
curl -X POST "https://coverai.ru/api/v1/generate_cover"   -H "Authorization: Bearer <your_api_key>"   -H "Content-Type: application/json"   -d '{
    "video": "data:video/mp4;base64,YourBase64EncodedVideoData",
    "user_text": "This is a video cover",
    "images": [
      "data:image/jpeg;base64,YourBase64EncodedImageData"
    ]
  }'
```

#### Response

- **Status Code:** `200 OK` if successful
- **Body:**
  - `cover_image_url`: URL to the generated cover image.
  - `video_preview_url`: URL to the video preview (if available).
  - `status`: A status message indicating the result of the generation.

#### Example Response

```json
{
  "cover_image_url": "https://coverai.ru/generated_covers/abc123.jpg",
  "video_preview_url": "https://coverai.ru/generated_covers/abc123.mp4",
  "status": "Cover successfully generated"
}
```

---

## Error Responses

- **400 Bad Request:** Missing or invalid parameters.
- **401 Unauthorized:** Invalid API key or no API key provided.
- **500 Internal Server Error:** An error occurred while processing the request.

---

## Usage Examples

### Python (Requests)

```python
import requests

url = "https://coverai.ru/api/v1/generate_cover"
headers = {
    "Authorization": "Bearer <your_api_key>",
    "Content-Type": "application/json"
}
data = {
    "video": "data:video/mp4;base64,YourBase64EncodedVideoData",
    "user_text": "This is a video cover",
    "images": [
        "data:image/jpeg;base64,YourBase64EncodedImageData"
    ]
}
response = requests.post(url, json=data, headers=headers)
print(response.json())
```

### JavaScript (Fetch)

```javascript
const url = "https://coverai.ru/api/v1/generate_cover";
const headers = {
  "Authorization": "Bearer <your_api_key>",
  "Content-Type": "application/json"
};
const data = {
  video: "data:video/mp4;base64,YourBase64EncodedVideoData",
  user_text: "This is a video cover",
  images: [
    "data:image/jpeg;base64,YourBase64EncodedImageData"
  ]
};

fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Terms of Service

The API is paid and can be used for both personal and commercial projects. Please refer to the **[CoverAI Terms of Service](https://coverai.ru/terms)** for more details.
