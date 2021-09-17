from datetime import date
from typing import Optional, List
from sqlalchemy.orm import Session
from . import models, types


def get_task(db: Session, task_id: int) -> Optional[models.Task]:
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def get_tasks(db: Session, limit: Optional[int] = None) -> List[models.Task]:
    return db.query(models.Task).limit(limit).all()


def create_task(db: Session, task: types.TaskRequest) -> models.Task:
    formatted_date = date.fromisoformat(task.date) if task.date else None
    db_task = models.Task(text=task.text, date=formatted_date)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int) -> models.Task:
    db_task = get_task(db, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
        return db_task
    else:
        raise KeyError(f"Task with id {task_id} does not exist.")
