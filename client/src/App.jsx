import React from 'react';
import Home from './components/Home.jsx';
import AnimalList from './components/AnimalList.jsx';
import Admin from './components/Admin.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<AnimalList animalType="dogs" />} />
        <Route path="/monkeys" element={<AnimalList animalType="monkeys" />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
