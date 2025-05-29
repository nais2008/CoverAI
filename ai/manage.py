from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.routes import router
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
app.include_router(router)

# Создаём директорию для изображений, если не существует
os.makedirs("static/generated", exist_ok=True)

# Монтируем папку со статикой
app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    import uvicorn

    host = os.environ.get("FASTAPI_HOST", "127.0.0.1")
    port = int(os.environ.get("FASTAPI_PORT", 8000))

    uvicorn.run("manage:app", host=host, port=port, reload=True)
