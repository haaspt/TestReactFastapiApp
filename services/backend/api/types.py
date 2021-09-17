import datetime
from typing import Optional
from pydantic import BaseModel


class BaseTask(BaseModel):
    text: str


class TaskRequest(BaseTask):
    date: Optional[str] = None


class TaskInDB(BaseTask):
    id: int
    date: Optional[datetime.date] = None

    class Config:
        orm_mode = True


class ErrorMessage(BaseModel):
    message: str
