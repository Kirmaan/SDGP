import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js'
import Reception from './components/Reception'

function App() {
  return (
    <main>
    <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/Reception" element={<Reception/>} exact />
    </Routes>
</main>
  );
}

export default App;
