import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import { toast } from 'react-toastify';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [search, setSearch] = useState('');
  const { tasks, dispatch } = useTask();

  const handleAdd = () => {
    if (!title.trim()){
      toast.info("please Enter Task")
      return;
    } 
    
    const newTask = {
      id: Date.now(),
      title,
      description: desc,
      done: false,
    };
    
    const userTasks = tasks.filter(t => t.id > 1000); // remove sample tasks
    dispatch({ type: 'SET_TASKS', payload: [...userTasks, newTask] });
    setTitle('');
    setDesc('');
  };

  const handleDelete = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const handleToggle = (id) => dispatch({ type: 'TOGGLE_DONE', payload: id });

  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="add-task">
      <h2>Add New Task</h2>
      <input style={{padding:"10px",fontWeight:"bold", marginRight:"20px"}}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      /> <br />
      <textarea style={{padding:"10px",fontWeight:"bold", marginRight:"20px", marginTop:"10px", outline:"none"}}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Task Description"
      /> <br />
      <button style={{padding: '12px',border: 'none',backgroundColor: 'orange',color: 'black',borderRadius: '8px',fontSize: '16px',cursor: 'pointer'}} onClick={handleAdd}>Add Task</button>
      

      <h3>Your Existing Tasks</h3>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
      />

      {filtered.length === 0 && <p>No matching tasks found.</p>}
      {filtered.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default AddTask;