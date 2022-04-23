import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.scss';
import InGame from './pages/InGame';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/stop" element={<HomePage />} />
        <Route path="/stop/game" element={<InGame />} />
        <Route
          path="*"
          element={<h1 style={{ color: 'red' }}>OPS... PAGE NOT FOUND!</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
