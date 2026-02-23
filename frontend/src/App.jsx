import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/market/Dashboard';
import Messages from './pages/chat/Messages';
import Admin from './pages/admin/Admin';
import Layout from './components/Layout';
// import Theme from './components/ThemeShowcase';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Routes>
      {/*Public routes*/}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*authenticated routes (with shared layout)*/}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/admin" element={<Admin/>} />
      </Route>
    </Routes>
  );
}
