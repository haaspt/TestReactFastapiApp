"""Just a fake stand-in for an actual DB"""
from typing import Dict, List, Optional
from .types import TaskInDB

tasks: Dict[int, TaskInDB] = {
    1: TaskInDB(id=1, text="This is a sample task, try adding your own!", date="9/16/2021"),
}


def get_task_by_id(id: int) -> Optional[TaskInDB]:
    if id in tasks:
        return tasks[id]
    else:
        return None


def get_tasks() -> List[TaskInDB]:
    return [task for task in tasks.values()]


def add_task(text: str, date: Optional[str] = None) -> int:
    new_id = max(tasks) + 1
    new_task = TaskInDB(id=new_id, text=text, date=date)
    tasks[new_id] = new_task
    return new_id


def remove_task_by_id(id: int) -> TaskInDB:
    if id in tasks:
        task = tasks.pop(id)
        return task
    else:
        raise KeyError(f"{id} did not match any current task_id.")
