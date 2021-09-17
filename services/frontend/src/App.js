import { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([
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
  ])

  const addTask = (taskText, taskDate) => {
    
    const newTask = {
      id: Math.max(...tasks.map(task => task.id), 0) + 1,
      text: taskText,
      date: taskDate,
    }
    setTasks([...tasks, newTask]);
    console.log(tasks);
  }

  const deleteTask = (taskID) => {
    console.log('Deleting task!')
    setTasks(tasks.filter(task => task.id !== taskID));
    console.log(tasks);
  }

  return (
    <div>
      <Header onTaskSubmit={addTask}/>
      <TaskList taskList={tasks} onTaskDelete={deleteTask}/>
    </div>
  )
}

export default App;
