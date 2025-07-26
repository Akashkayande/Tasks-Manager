import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import { fetchSampleTasks } from '../tasksAPI';

const Home = () => {
  const { tasks, dispatch, sampleFetched } = useTask();
  const [search, setSearch] = useState('');

  const handleFetchSample = async () => {
    const data = await fetchSampleTasks();
    dispatch({ type: 'SET_TASKS', payload: data });
    dispatch({ type: 'SET_SAMPLE_FETCHED' });
  };

  const handleDelete = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const handleToggle = (id) => dispatch({ type: 'TOGGLE_DONE', payload: id });

  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      {!sampleFetched && tasks.length === 0 && (
        <button onClick={handleFetchSample} style={{}}>Get Sample Tasks</button>
      )}
      {tasks.length > 0 && (
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />
      )}
      {filtered.map(task => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} onToggle={handleToggle} />
      ))}
    </div>
  );
};

export default Home;