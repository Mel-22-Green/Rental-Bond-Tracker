import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await API.post('/auth/login', formData);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <video autoPlay loop muted playsInline style={styles.videoBg}>
                <source src="/videos/background.mp4" type="video/mp4" />
            </video>

            <div style={styles.glassCard}>
                <div style={styles.logoSection}>
                    <div style={styles.logoCircle}>
                        <span style={styles.logoIcon}>🏠</span>
                    </div>
                    <h1 style={styles.title}>Rental Bond Tracker</h1>
                    <p style={styles.subtitle}>Manage your rental bonds with confidence</p>
                </div>

                {error && <div style={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <span style={styles.inputIcon}>📧</span>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <span style={styles.inputIcon}>🔒</span>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p>Don't have an account? <Link to="/register" style={styles.link}>Create Account</Link></p>
                    <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoBg: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
    },
    glassCard: {
        position: 'relative',
        zIndex: 10,
        width: '450px',
        maxWidth: '90%',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '48px 40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.2)',
        animation: 'fadeIn 0.8s ease-out',
    },
    logoSection: { textAlign: 'center', marginBottom: '32px' },
    logoCircle: {
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, rgba(102,126,234,0.6), rgba(118,75,162,0.6))',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        border: '1px solid rgba(255,255,255,0.3)',
        animation: 'float 3s ease-in-out infinite',
    },
    logoIcon: { fontSize: '40px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 0 8px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' },
    subtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '4px 20px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s',
    },
    inputIcon: { fontSize: '20px', marginRight: '12px', opacity: 0.7 },
    input: {
        flex: 1,
        padding: '16px 0',
        border: 'none',
        background: 'transparent',
        fontSize: '15px',
        outline: 'none',
        color: 'white',
    },
    button: {
        width: '100%',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '16px',
        border: 'none',
        borderRadius: '16px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px',
        transition: 'transform 0.2s',
    },
    errorMessage: {
        background: 'rgba(220,38,38,0.9)',
        color: 'white',
        padding: '12px',
        borderRadius: '12px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '14px',
    },
    footer: { textAlign: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' },
    link: { color: 'white', textDecoration: 'none', fontWeight: '600' },
    forgotLink: { color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px', display: 'inline-block', marginTop: '12px' },
};

export default Login;

