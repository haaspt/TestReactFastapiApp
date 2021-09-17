import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchInitialTasks = async () => {
      const result = await axios(
        'http://localhost:8000/tasks',
      );

      setTasks(result.data);
    };

    fetchInitialTasks();
  }, []);
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
