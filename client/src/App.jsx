import React from 'react';
import Home from './components/Home.jsx';
import AnimalList from './components/AnimalList.jsx';
import Admin from './components/Admin.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import ManageAnimals from './components/ManageAnimals.jsx';
import AddAnimal from './components/AddAnimal.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<AnimalList animalType="dogs" />} />
        <Route path="/monkeys" element={<AnimalList animalType="monkeys" />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<Admin />} />
          <Route path="dogs" element={<ManageAnimals animalType="dogs" />} />
          <Route path="monkeys" element={<ManageAnimals animalType="monkeys" />} />
          <Route path="add-animal" element={<AddAnimal />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
