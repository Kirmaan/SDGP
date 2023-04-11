import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js'

function App() {
  return (
    <main>
    <Routes>
        <Route path="/Home" element={<Home/>} exact />
    </Routes>
</main>
  );
}

export default App;
