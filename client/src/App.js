import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyQuotesPage from './pages/MyQuotes';
import ItemMatchPage from './pages/ItemMatch';
import LoadingPage from './pages/Loading';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyQuotesPage /> } />
        <Route path="/match" element={<ItemMatchPage /> } />
        <Route path="/loading" element={<LoadingPage /> } />
      </Routes>
    </Router>
  )
}

export default App;
  