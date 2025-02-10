import os

import dotenv

dotenv.load_dotenv()

HOST = os.environ.get("FASTAPI_HOST", "127.0.0.1")
PORT = int(os.environ.get("FASTAPI_PORT", 1111))

POSTGRES_DB = os.environ.get("POSTGRES_DB", "exemple_db")
POSTGRES_USER = os.environ.get("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "password")
POSTGRES_HOST = os.environ.get("POSTGRES_HOST", "127.0.0.1")
POSTGRES_PORT = os.environ.get("POSTGRES_PORT", 1112)
