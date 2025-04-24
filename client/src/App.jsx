import React from 'react';
import Home from './components/Home.jsx';
import AnimalList from './components/AnimalList.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<AnimalList animalType="dogs" />} />
        <Route path="/monkeys" element={<AnimalList animalType="monkeys" />} />
      </Routes>
    </Router>
  );
}

export default App;
