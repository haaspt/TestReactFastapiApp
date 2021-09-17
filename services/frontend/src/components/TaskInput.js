import { useState } from "react";
import { PropTypes } from "prop-types";

const TaskInput = ({ onTaskSubmit }) => {
  const getTodayDateString = () => {
    const today = new Date();
    const dateString = today.toISOString().substring(0, 10);
    return dateString;
  };

  const getMinimumDateString = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateString = date.toISOString().substring(0, 10);
    return dateString;
  };

  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState(getTodayDateString());

  const handleTextChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleDateChange = (event) => {
    setTodoDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todoText) {
      alert("Please enter something to do!");
    }
    // console.log(`Submitting todo: ${todoText} (${todoDate})`);
    onTaskSubmit(todoText, todoDate);
    setTodoText("");
    setTodoDate(getTodayDateString());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoText}
          onChange={handleTextChange}
          placeholder={"What do you need to do?"}
        ></input>
        <br />
        <input
          type="date"
          value={todoDate}
          min={getMinimumDateString()}
          onChange={handleDateChange}
        ></input>
        <br />
        <input type="submit" value="Add Task" />
      </form>
    </div>
  );
};

TaskInput.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
};

export default TaskInput;
