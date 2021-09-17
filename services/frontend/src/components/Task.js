import { PropTypes } from "prop-types";

const Task = ({ task, onTaskDelete }) => {
  return (
    <div>
      <p>{task.text}</p>
      {task.date && <p>{task.date}</p>}
      <button type="button" onClick={() => onTaskDelete(task.id)}>
        Remove
      </button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string,
  }),
  onTaskDelete: PropTypes.func,
};

export default Task;
