import { useState } from 'react';
import Task from "./Task";

const TaskList = ({ taskList }) => {
    const [tasks, setTasks] = useState(taskList);

    const onTaskDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div>
            {tasks.length > 0 ?
                tasks.map((task) =>
                    <Task task={task} onTaskDelete={onTaskDelete} key={task.id} />
                )
                : "No tasks yet!"}
        </div>
    )
}

export default TaskList;
