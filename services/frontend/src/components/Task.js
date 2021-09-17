const Task = ({ task, onTaskDelete }) => {
    return (
        <div>
            <p>{task.text}</p>
            <p>{task.date}</p>
            <button type="button" onClick={() => onTaskDelete(task.id)}>
                Remove
            </button>
        </div>
    )
}

export default Task;
