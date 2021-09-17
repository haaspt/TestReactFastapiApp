from typing import Optional
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from . import db

app = FastAPI()


class Task(BaseModel):
    id: int
    text: str
    date: Optional[str] = None


class TaskIn(BaseModel):
    text: str
    date: Optional[str] = None


class Message(BaseModel):
    message: str


@app.get("/")
async def get_root():
    return {"data": "Hello, world!"}


@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    tasks = db.get_tasks()
    tasks_dict = [task.to_dict() for task in tasks]
    return tasks_dict


@app.get("/task/{task_id}",
         response_model=Task,
         responses={404: {"model": Message}})
async def get_task(task_id: int):
    task = db.get_task_by_id(task_id)
    if task:
        return task.to_dict()
    else:
        JSONResponse(status_code=404, content={"message": "Item not found"})


@app.post("/task/", response_model=TaskIn)
async def post_task(task: TaskIn):
    task_id = db.add_task(task.text, task.date)
    task_out = Task(**task.dict(), id=task_id)
    return task_out


@app.delete("/task/{task_id}",
            response_model=Task,
            responses={404: {"model": Message}})
async def delete_task(task_id: int):
    try:
        deleted_task = db.remove_task_by_id(task_id)
        return deleted_task
    except KeyError:
        JSONResponse(
            status_code=404,
            content={"message": f"Item with id {task_id} was not found"},
        )
