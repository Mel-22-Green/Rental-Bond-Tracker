import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Bonds from './pages/Bonds';
import Inspections from './pages/Inspections';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import ChatBot from './components/ChatBot';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/bonds" element={<Bonds />} />
                <Route path="/inspections" element={<Inspections />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin-login" element={<AdminLogin />} />

            </Routes>
            {/* ChatBot appears on every page */}
            <ChatBot />
        </Router>
    );
}

export default App;

