import React from "react";
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import InGame from './pages/InGame';

function App() {
  return <div className="App">
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/play' element={<InGame />} />
    </Routes>
  </div>;
}

export default App;
