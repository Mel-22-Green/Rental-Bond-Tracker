import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Register() {
    const [formData, setFormData] = useState({
        full_name: '', email: '', password: '', confirmPassword: '', phone: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        const { confirmPassword, ...registrationData } = formData;
        try {
            await API.post('/auth/register', registrationData);
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
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
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>Start tracking your rental bonds today</p>
                </div>

                {message && <div style={styles.successMessage}>{message}</div>}
                {error && <div style={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <span style={styles.inputIcon}>👤</span>
                        <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <span style={styles.inputIcon}>📧</span>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
                    </div>

                    <div style={styles.row}>
                        <div style={styles.halfInput}>
                            <div style={styles.inputGroup}>
                                <span style={styles.inputIcon}>🔒</span>
                                <input type="password" name="password" placeholder="Password (min 8)" onChange={handleChange} required style={styles.input} />
                            </div>
                        </div>
                        <div style={styles.halfInput}>
                            <div style={styles.inputGroup}>
                                <span style={styles.inputIcon}>✓</span>
                                <input type="password" name="confirmPassword" placeholder="Confirm" onChange={handleChange} required style={styles.input} />
                            </div>
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <span style={styles.inputIcon}>📱</span>
                        <input type="tel" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p>Already have an account? <Link to="/login" style={styles.link}>Login here</Link></p>
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
        width: '520px',
        maxWidth: '90%',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.2)',
        animation: 'fadeIn 0.8s ease-out',
    },
    logoSection: { textAlign: 'center', marginBottom: '28px' },
    logoCircle: {
        width: '70px',
        height: '70px',
        background: 'linear-gradient(135deg, rgba(102,126,234,0.6), rgba(118,75,162,0.6))',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        border: '1px solid rgba(255,255,255,0.3)',
    },
    logoIcon: { fontSize: '35px' },
    title: { fontSize: '26px', fontWeight: 'bold', color: 'white', margin: '0 0 6px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' },
    subtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 },
    row: { display: 'flex', gap: '16px', marginBottom: '0' },
    halfInput: { flex: 1 },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '4px 16px',
        marginBottom: '16px',
        border: '1px solid rgba(255,255,255,0.2)',
    },
    inputIcon: { fontSize: '18px', marginRight: '12px', opacity: 0.7 },
    input: {
        flex: 1,
        padding: '14px 0',
        border: 'none',
        background: 'transparent',
        fontSize: '14px',
        outline: 'none',
        color: 'white',
    },
    button: {
        width: '100%',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '14px',
        border: 'none',
        borderRadius: '14px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px',
    },
    successMessage: { background: 'rgba(5,150,105,0.9)', color: 'white', padding: '12px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' },
    errorMessage: { background: 'rgba(220,38,38,0.9)', color: 'white', padding: '12px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' },
    footer: { textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' },
    link: { color: 'white', textDecoration: 'none', fontWeight: '600' },
};

export default Register;