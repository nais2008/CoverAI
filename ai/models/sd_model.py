import torch
from diffusers import StableDiffusionImg2ImgPipeline
import PIL

_model = None
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def get_sd_pipeline():
    global _model
    if _model is None:
        _model = StableDiffusionImg2ImgPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5",
            torch_dtype=(
                torch.float16 if _device.type == "cuda" else torch.float32
            ),
        ).to(_device)
    return _model
