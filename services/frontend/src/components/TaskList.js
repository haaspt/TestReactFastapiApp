import { PropTypes } from "prop-types";
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

TaskList.propTypes = {
    taskList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            date: PropTypes.string,
        })
    ).isRequired,
    onTaskDelete: PropTypes.func.isRequired,
}

export default TaskList;
