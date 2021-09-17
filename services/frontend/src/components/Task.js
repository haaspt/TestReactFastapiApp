const Task = ({ task }) => {
    return (
        <div>
            <p>{task.text}</p>
            <p>{task.date}</p>
        </div>
    )
}

export default Task
