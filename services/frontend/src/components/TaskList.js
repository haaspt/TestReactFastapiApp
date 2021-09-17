import Task from "./Task"

const TaskList = () => {
    const tasks = [
        {
            id: 1,
            text: "Kiss Ally!",
            date: "9/16/2021"
        },
        {
            id: 2,
            text: "Make steak",
            date: "9/17/2021"
        },
        {
            id: 3,
            text: "Do work",
            date: "Never!"
        },
    ]

    return (
        <div>
            {tasks.map((task) =>
                <Task task={task} key={task.id} />
            )}
        </div>
    )
}

export default TaskList
