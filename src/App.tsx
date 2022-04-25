import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.scss';
import InGame from './pages/InGame';

function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
    console.log('here');
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<InGame />} />
        <Route
          path="*"
          element={<h1 style={{ color: 'red' }}>OPS... PAGE NOT FOUND!</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
