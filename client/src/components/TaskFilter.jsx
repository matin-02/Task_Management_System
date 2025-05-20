import './TaskFilter.css';

function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'high', label: 'High Priority' }
  ];

  return (
    <div className="task-filter">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
          aria-label={`Show ${filter.label}`}
        >
          {filter.label}
          {currentFilter === filter.id && <span className="active-indicator" />}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;