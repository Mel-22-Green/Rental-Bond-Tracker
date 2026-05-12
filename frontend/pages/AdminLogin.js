import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await API.post('/auth/login', formData);
            const { token, user } = response.data;

            // Store token and user
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAdmin', 'true');

            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>👑 Admin Portal</h1>
                <p style={styles.subtitle}>Administrator Access Only</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Admin Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={styles.input} />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={styles.input} />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Logging in...' : 'Admin Login'}
                    </button>
                </form>

                <p style={styles.footer}>
                    <a href="/login" style={styles.link}>← Back to User Login</a>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f0f1a, #1a1a2e)',
    },
    card: {
        background: 'rgba(0,0,0,0.8)',
        borderRadius: '20px',
        padding: '40px',
        width: '420px',
        textAlign: 'center',
        border: '1px solid #667eea',
    },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#667eea', marginBottom: '10px' },
    subtitle: { fontSize: '14px', color: '#aaa', marginBottom: '30px' },
    input: {
        width: '100%',
        padding: '14px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #333',
        background: '#222',
        color: 'white',
        fontSize: '14px',
    },
    button: {
        width: '100%',
        padding: '14px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    error: { background: 'rgba(220,38,38,0.2)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px' },
    footer: { marginTop: '20px', color: '#666' },
    link: { color: '#667eea', textDecoration: 'none' },
};

export default AdminLogin;