import { useState } from 'react';

const TaskInput = ({ onTaskSubmit }) => {
    const [todoText, setTodoText] = useState('');
    const [todoDate, setTodoDate] = useState('');

    const handleTextChange = (event) => {
        setTodoText(event.target.value);
    }

    const handleDateChange = (event) => {
        setTodoDate(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!todoText) {
            alert("Please enter something to do!");
        }
        // console.log(`Submitting todo: ${todoText} (${todoDate})`);
        onTaskSubmit(todoText, todoDate);
        setTodoText('');
        setTodoDate('');
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <input type="text" value={todoText} onChange={handleTextChange} placeholder={"What do you need to get done?"}></input>
                <input type="text" value={todoDate} onChange={handleDateChange} placeholder={"When do you need to do it?"}></input>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default TaskInput
