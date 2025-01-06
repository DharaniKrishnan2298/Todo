
import React, { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './components/TaskForm'; 

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const addTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <TaskList tasks={tasks} onDelete={deleteTask} onComplete={completeTask} filter={filter} />
    </div>
  );
};

export default App;
