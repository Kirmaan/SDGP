import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js'
import Reception from './components/Reception'
import Docter_Patient from './components/Docter_Patient';
import Docter_Appointment from './components/Docter_Appointment';

function App() {
  return (
    <main>
    <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/Reception" element={<Reception/>} exact />
        <Route path="/DocterPatient" element={<Docter_Patient/>} exact />
        <Route path="/DocterAppointment" element={<Docter_Appointment/>} exact />
    </Routes>
</main>
  );
}

export default App;
