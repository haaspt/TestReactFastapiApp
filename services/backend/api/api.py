from fastapi import FastAPI
from fastapi.responses import JSONResponse
from typing import List
from . import db
from .types import (
    TaskRequest,
    TaskInDB,
    ErrorMessage,
)

app = FastAPI()


@app.get("/")
async def get_root():
    return {"data": "Hello, world!"}


@app.get("/tasks", response_model=List[TaskInDB])
async def get_tasks():
    tasks = db.get_tasks()
    return tasks


@app.get(
    "/task/{task_id}", response_model=TaskInDB, responses={404: {"model": ErrorMessage}}
)
async def get_task(task_id: int):
    task = db.get_task_by_id(task_id)
    if task:
        return task
    else:
        return JSONResponse(status_code=404, content={"message": "Item not found"})


@app.post("/task/", response_model=TaskInDB)
async def post_task(task: TaskRequest):
    task_id = db.add_task(task.text, task.date)
    task_out = TaskInDB(**task.dict(), id=task_id)
    return task_out


@app.delete(
    "/task/{task_id}", response_model=TaskInDB, responses={404: {"model": ErrorMessage}}
)
async def delete_task(task_id: int):
    try:
        deleted_task = db.remove_task_by_id(task_id)
        return deleted_task
    except KeyError:
        return JSONResponse(
            status_code=404,
            content={"message": f"Item with id {task_id} was not found"},
        )
