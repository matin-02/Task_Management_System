import { useState } from 'react';
import { format, isBefore, startOfToday } from 'date-fns';
import { FaCheck, FaTrash, FaFlag, FaExclamation } from 'react-icons/fa';

const priorityColors = {
  high: '#ff4444',
  medium: '#ffbb33',
  low: '#00C851'
};

const priorityIcons = {
  high: '🔥',
  medium: '⚠️',
  low: '🌿'
};

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isOverdue = !task.completed && isBefore(new Date(task.dueDate), startOfToday());

  const handleToggleComplete = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onToggleComplete(task._id);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${isAnimating ? 'animating' : ''}`}>
      <div className="task-checkbox" onClick={handleToggleComplete}>
        <div className={`checkbox ${task.completed ? 'checked' : ''}`}>
          {task.completed ? <FaCheck /> : null}
        </div>
      </div>
      
      <div className="task-content">
        <div className="task-header">
          <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
          <div className="task-meta">
            {/* Removed the medium priority exclusion */}
            <span className="priority-badge" style={{ backgroundColor: priorityColors[task.priority] }}>
              <span className="priority-icon">{priorityIcons[task.priority]}</span>
              {task.priority}
            </span>
            <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              {isOverdue && <span className="overdue-badge">Overdue</span>}
            </span>
          </div>
        </div>
        
        {task.description && (
          <p className={`task-description ${task.completed ? 'completed' : ''}`}>
            {task.description}
          </p>
        )}
        
        {task.completed && (
          <div className="completion-info">
            Completed on {format(new Date(task.completedAt), 'MMM dd, yyyy')}
          </div>
        )}
      </div>
      
      <div className="task-actions">
        <button 
          className="delete-btn"
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;