import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
};

export default App;
