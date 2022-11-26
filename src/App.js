import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const getTask = (e) => {
    setTask(e.target.value);
  }

  const addTask = () => {
    if(task.trim().length > 0) {
      let taskListCopy = [...taskList];
      let taskCopy = task;
      taskListCopy.unshift({ 
        id: (new Date()).getTime(), 
        task: taskCopy.charAt().toUpperCase()+taskCopy.slice(1), 
        done: false 
      });
      setTaskList(taskListCopy);
    }
    setTask('');
  }

  const addTaskWhenKeyDown = (e) => {
    if(e.code === "Enter") {
      addTask();
    }
  }

  const taskDone = (e) => {
    let taskListCopy = [...taskList];
    taskListCopy.map(task => task.id == e.target.id ? task.done = !task.done : '' );
    setTaskList(taskListCopy);
  }

  const removeTask = (e) => {
    let taskListCopy = [...taskList];
    let filteredTasks = taskListCopy.filter(task => task.id != e.target.id);
    setTaskList(filteredTasks);
  }

  return (
    <div className="App">

        <header className='header'>
          <h1>Tasks List</h1>
        </header>

        <div className='create-task'>
          <input type="text" 
                 onChange={getTask} 
                 value={task}
                 onKeyDown={addTaskWhenKeyDown} />
          <button onClick={addTask}>Create Task</button>
        </div>

        <div className='tasks-list'>
          <ul>          
            {
              taskList.map(task => {
                return (
                  <li key={task.id}>
                    <div className='checkbox' onClick={taskDone} id={task.id}>
                    <div className={`${task.done ? 'checkbox-selected' : ''}`} id={task.id}></div>
                    </div>
                    <span className={`text ${task.done ? 'task-done' : ''}`}>{task.task}</span>
                    <span className='task-close' onClick={removeTask} id={task.id}>
                  {task.done ? <>&times;</> : ''}
                </span>
                  </li>
                )
              })
            }
           </ul>
          </div>
     
    </div>
  );
}

export default App;