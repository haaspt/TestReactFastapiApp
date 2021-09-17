from typing import Optional
from pydantic import BaseModel


class BaseTask(BaseModel):
    text: str
    date: Optional[str] = None


class TaskRequest(BaseTask):
    pass


class TaskInDB(BaseTask):
    id: int

    class Config:
        orm_mode = True


class ErrorMessage(BaseModel):
    message: str
