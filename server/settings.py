import os

import dotenv

dotenv.load_dotenv()

HOST = os.environ.get("FASTAPI_HOST", "127.0.0.1")
PORT = int(os.environ.get("FASTAPI_PORT", 0000))
