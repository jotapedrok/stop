import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/testando" element={<h1>OPS... PAGE NOT FOUND!</h1>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
