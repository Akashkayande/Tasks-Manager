import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';

const EditTask = () => {
  const { tasks, dispatch } = useTask();
  const [search, setSearch] = useState('');

  const handleEdit = (task) => {
    const newTitle = prompt('Enter new title', task.title);
    if (!newTitle?.trim()) return;
    const updated = { ...task, title: newTitle };
    dispatch({ type: 'EDIT_TASK', payload: updated });
  };

  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="edit-task">
      <h2>Edit Tasks</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks to edit..."
      />

      {filtered.length === 0 && <p>No matching tasks found.</p>}
      {filtered.map(task => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <button onClick={() => handleEdit(task)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default EditTask;