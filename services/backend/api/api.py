from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
from sqlalchemy.orm.session import Session
from . import crud, models
from .database import SessionLocal, engine
from .types import (
    TaskRequest,
    TaskInDB,
    ErrorMessage,
)


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


origins = ["http://localhost", "http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def get_root():
    return {"data": "Hello, world!"}


@app.get("/tasks", response_model=List[TaskInDB])
async def get_tasks(db: Session = Depends(get_db)):
    db_tasks = crud.get_tasks(db)
    return db_tasks


@app.get(
    "/task/{task_id}", response_model=TaskInDB, responses={404: {"model": ErrorMessage}}
)
async def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if task:
        return task
    else:
        return JSONResponse(status_code=404, content={"message": "Item not found"})


@app.post("/task/", response_model=TaskInDB)
async def post_task(task: TaskRequest, db: Session = Depends(get_db)):
    task_out = crud.create_task(db, task)
    return task_out


@app.delete(
    "/task/{task_id}", response_model=TaskInDB, responses={404: {"model": ErrorMessage}}
)
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    try:
        deleted_task = crud.delete_task(db, task_id)
        return deleted_task
    except KeyError:
        return JSONResponse(
            status_code=404,
            content={"message": f"Item with id {task_id} was not found"},
        )
