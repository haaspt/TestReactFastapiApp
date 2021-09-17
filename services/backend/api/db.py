"""Just a fake stand-in for an actual DB"""
from dataclasses import dataclass
from typing import Dict, List, Optional


@dataclass
class Task:
    id: int
    text: str
    date: Optional[str]

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "text": self.text,
            "date": self.date,
        }


tasks: Dict[int, Task] = {
    1: Task(1, "Kiss Ally!", "9/16/2021"),
    2: Task(2, "Cook steak", "9/17/2021"),
    3: Task(3, "Do work....", "Never!!"),
}


def get_task_by_id(id: int) -> Optional[Task]:
    if id in tasks:
        return tasks[id]
    else:
        return None


def get_tasks() -> List[Task]:
    return [task for task in tasks.values()]


def add_task(text: str, date: Optional[str] = None) -> int:
    new_id = max(tasks) + 1
    new_task = Task(new_id, text, date)
    tasks[new_id] = new_task
    return new_id


def remove_task_by_id(id: int) -> Task:
    if id in tasks:
        task = tasks.pop(id)
        return task
    else:
        raise KeyError(f"{id} did not match any current task_id.")
