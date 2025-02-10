import sqlalchemy
import sqlalchemy.ext
import sqlalchemy.ext.declarative

import settings

__all__ = ("Base")

SQLALCHEMY_DB_URL = (
    f"postgresql+psycopg2://{settings.POSTGRES_USER}"
    f"@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}"
    f"/{settings.POSTGRES_DB}"
)

engine = sqlalchemy.create_engine(
  SQLALCHEMY_DB_URL, connect_args={}, future=True,
)

Base = sqlalchemy.ext.declarative.declarative_base()


def get_db():
    db = Base()

    try:
        yield db
    finally:
        db.close()
