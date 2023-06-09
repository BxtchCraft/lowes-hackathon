import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyQuotesPage from './pages/MyQuotes';
import ItemMatchPage from './pages/ItemMatch';
import LoadingPage from './pages/Loading';
import CompetitiveQuotePage from './pages/CompetitiveQuote';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyQuotesPage /> } />
        <Route path="/match" element={<ItemMatchPage /> } />
        <Route path="/loading" element={<LoadingPage /> } />
        <Route path="/quote/6472711" element={<CompetitiveQuotePage /> } />
      </Routes>
    </Router>
  )
}

export default App;
  