import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage';
import Onboarding from './pages/Onboarding';
import Auth from './pages/SignLogin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signlogin" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;