import fastapi
import uvicorn

import settings

__all__ = ()

app = fastapi.FastAPI()


@app.get("/")
@app.get("/index")
def index():
    return {
        "Hello": "Hello world",
    }


if __name__ == "__main__":
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
