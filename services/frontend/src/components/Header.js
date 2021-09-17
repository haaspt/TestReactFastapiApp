import TaskInput from "./TaskInput"

const Header = ({ onTaskSubmit }) => {
    return (
        <div>
            <h1>My Todo List</h1>
            <TaskInput onTaskSubmit={onTaskSubmit}/>
        </div>
    )
}

export default Header
