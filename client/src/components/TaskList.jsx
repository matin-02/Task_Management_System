import { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    if (activeFilter === 'overdue') {
      const today = new Date();
      return !task.completed && new Date(task.dueDate) < today;
    }
    if (activeFilter === 'high') return task.priority === 'high';
    return true;
  });

  const getFilterMessage = () => {
    switch(activeFilter) {
      case 'completed':
        return "No completed tasks found. Try adding some tasks or checking other filters.";
      case 'pending':
        return "No pending tasks found. All tasks are completed!";
      case 'overdue':
        return "No overdue tasks found. Great job staying on top of things!";
      case 'high':
        return "No high priority tasks found. Try adding some important tasks.";
      default:
        return "No tasks found. Start by adding your first task!";
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-filters">
        <button 
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => setActiveFilter('all')}
        >
          All Tasks
        </button>
        <button 
          className={activeFilter === 'pending' ? 'active' : ''}
          onClick={() => setActiveFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={activeFilter === 'completed' ? 'active' : ''}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={activeFilter === 'overdue' ? 'active' : ''}
          onClick={() => setActiveFilter('overdue')}
        >
          Overdue
        </button>
        <button 
          className={activeFilter === 'high' ? 'active' : ''}
          onClick={() => setActiveFilter('high')}
        >
          High Priority
        </button>
      </div>
      
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>{getFilterMessage()}</h3>
            {activeFilter !== 'all' && (
              <button 
                className="reset-filter-btn"
                onClick={() => setActiveFilter('all')}
              >
                Show All Tasks
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;