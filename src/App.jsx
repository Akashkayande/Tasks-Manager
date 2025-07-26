import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider, useTask } from './context/TaskContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useTask();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
  
    <TaskProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddTask /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer theme='colored' position='top-right' autoClose={3000}/>
    </TaskProvider>
    
  );
}

export default App;