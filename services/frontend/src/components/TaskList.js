import Task from "./Task";

const TaskList = ({ taskList, onTaskDelete }) => {

    return (
        <div>
            {taskList.length > 0 ?
                taskList.map((task) =>
                    <Task task={task} onTaskDelete={onTaskDelete} key={task.id} />
                )
                : "No tasks yet!"}
        </div>
    )
}

export default TaskList;
