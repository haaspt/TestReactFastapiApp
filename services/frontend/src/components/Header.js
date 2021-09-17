import { PropTypes } from "prop-types";
import TaskInput from "./TaskInput";

const Header = ({ onTaskSubmit }) => {
  return (
    <div>
      <h1>My Todo List</h1>
      <TaskInput onTaskSubmit={onTaskSubmit} />
    </div>
  );
};

Header.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
};

export default Header;
