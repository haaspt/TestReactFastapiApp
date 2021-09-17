import { useState } from "react";
import { PropTypes } from "prop-types";

const TaskInput = ({ onTaskSubmit }) => {
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");

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
    setTodoDate("");
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
        <br/>
        <input
          type="date"
          value={todoDate}
          onChange={handleDateChange}
        ></input>
        <br/>
        <input type="submit" value="Add Task" />
      </form>
    </div>
  );
};

TaskInput.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
};

export default TaskInput;
