import Header from './components/Header';
import TaskList from './components/TaskList';

const App = () => {
  const tasks = [
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
  ];
  return (
    <div>
      <Header />
      <TaskList taskList={tasks}/>
    </div>
  )
}

export default App
