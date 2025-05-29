import fastapi
import fastapi.responses

import services.generation_service

router = fastapi.APIRouter()

__all__ = ["generate"]


@router.post("/api/v1/generate")
async def generate(
    text: str = fastapi.Form(...),
    video: fastapi.UploadFile = fastapi.File(...),
):
    video_bytes = await video.read()
    image_url = services.generation_service.generate_from_video_and_text(
        video_bytes,
        text,
    )

    return fastapi.responses.JSONResponse(
        {
            "status": "success",
            "image_url": image_url,
        }
    )
