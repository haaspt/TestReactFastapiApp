import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchInitialTasks = async () => {
    const results = await axios.get("http://localhost:8000/tasks");

    setTasks(results.data);
  };

  const postTaskToServer = async (task) => {
    const result = await axios.post("http://localhost:8000/task", task);
    return result.data;
  };

  const deleteTaskFromServer = async (taskID) => {
    const result = await axios.delete(`http://localhost:8000/task/${taskID}`);
    return result.data;
  };

  // Initial task fetch
  useEffect(() => {
    fetchInitialTasks();
  }, []);

  const addTask = (taskText, taskDate) => {
    const requestTask = {
      text: taskText,
      date: taskDate,
    };

    postTaskToServer(requestTask).then((createdTask) => {
      setTasks([...tasks, createdTask]);
    });
  };

  const deleteTask = (taskID) => {
    deleteTaskFromServer(taskID).then((resultData) => {
      console.log(resultData);
      setTasks(tasks.filter((task) => task.id !== taskID));
    });
  };

  return (
    <div>
      <Header onTaskSubmit={addTask} />
      <TaskList taskList={tasks} onTaskDelete={deleteTask} />
    </div>
  );
};

export default App;
