import enum

import sqlalchemy

from database import Base


__all__ = []


class Role(enum.Enum):
    admin = 1
    user = 2


class User(Base):
    __tablename__ = "users"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)
    email = sqlalchemy.Column(
        sqlalchemy.String(100),
        unique=True,
        index=True,
        nullable=False,
    )
    role = sqlalchemy.Column(enum.Enum(Role))
