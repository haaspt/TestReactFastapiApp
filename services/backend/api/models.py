from sqlalchemy import Integer, String, Column, Date
from .database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False, index=True)
    date = Column(Date, nullable=True)
