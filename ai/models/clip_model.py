import torch
from transformers import CLIPModel, CLIPProcessor

_clip_model = None
_clip_processor = None
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def get_clip_model():
    global _clip_model
    if _clip_model is None:
        _clip_model = CLIPModel.from_pretrained(
            "openai/clip-vit-base-patch32"
        ).to(_device)

    return _device, _clip_model


def get_clip_processor():
    global _clip_processor
    if _clip_processor is None:
        _clip_processor = CLIPProcessor.from_pretrained(
            "openai/clip-vit-base-patch32"
        )

    return _clip_processor
