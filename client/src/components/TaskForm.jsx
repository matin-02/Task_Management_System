import { useState } from 'react';
import { format } from 'date-fns';
import { FaPlus } from 'react-icons/fa';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    
    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed: false
    };
    
    onAddTask(newTask);
    resetForm();
    setIsFormOpen(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="task-form-container">
      {!isFormOpen ? (
        <button 
          className="add-task-btn"
          onClick={() => setIsFormOpen(true)}
        >
          <FaPlus /> Add Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <h3>Add New Task</h3>
          <div className="form-group">
            <label>Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Due Date*</label>
              <input
                type="date"
                value={dueDate}
                min={today}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
            <button type="submit">Add Task</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default TaskForm;