import fastapi

__all__ = ()

app = fastapi.FastAPI()


@app.get("/")
@app.get("/index")
def index():
    return {
        "Hello": "Hello world",
    }
