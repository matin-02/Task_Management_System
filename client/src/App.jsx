import { useState, useEffect } from 'react';
import api from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await api.post('/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleTaskComplete = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle-complete`);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Scheduler</h1>
        <p>Organize your work and boost productivity</p>
      </header>
      
      <main className="app-main">
        <TaskForm onAddTask={addTask} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onDelete={deleteTask}
            onToggleComplete={toggleTaskComplete}
          />
        )}
      </main>
    </div>
  );
}

export default App;