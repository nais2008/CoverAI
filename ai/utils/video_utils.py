import os
import tempfile

from moviepy import VideoFileClip
from PIL import Image


def extract_frame(video_bytes, second=1.0):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
        tmp.write(video_bytes)
        tmp_path = tmp.name

    try:
        clip = VideoFileClip(tmp_path)
        frame = clip.get_frame(second)
        image = Image.fromarray(frame).convert("RGB").resize((512, 512))
        return image
    finally:
        clip.close()
        os.remove(tmp_path)
