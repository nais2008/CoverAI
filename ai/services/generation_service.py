import datetime
import pathlib

import models.sd_model
import utils.video_utils


def generate_from_video_and_text(video_bytes: bytes, prompt: str) -> str:
    pipeline = models.sd_model.get_sd_pipeline()

    init_image = utils.video_utils.extract_frame(video_bytes)

    result = pipeline(
        prompt=prompt,
        image=init_image,
        strength=0.7,
        guidance_scale=7.5,
    ).images[0]

    output_path = pathlib.Path("static/generated")
    filename = f"{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
    filepath = output_path / filename
    result.save(filepath)

    return f"/static/generated/{filename}"
