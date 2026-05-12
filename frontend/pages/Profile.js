import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [passwordMode, setPasswordMode] = useState(false);
    const [formData, setFormData] = useState({ full_name: '', phone: '' });
    const [passwordData, setPasswordData] = useState({ current_password: '', new_password: '', confirm_password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        fetchProfile();
    }, [navigate]);

    const fetchProfile = async () => {
        try {
            const response = await API.get('/users/profile');
            setUser(response.data);
            setFormData({
                full_name: response.data.full_name || '',
                phone: response.data.phone || ''
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await API.put('/users/profile', formData);
            setMessage(response.data.message);
            setUser({ ...user, full_name: formData.full_name, phone: formData.phone });
            setEditMode(false);

            const storedUser = JSON.parse(localStorage.getItem('user'));
            storedUser.full_name = formData.full_name;
            localStorage.setItem('user', JSON.stringify(storedUser));

            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Update failed');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (passwordData.new_password !== passwordData.confirm_password) {
            setError('New passwords do not match');
            return;
        }

        if (passwordData.new_password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            await API.put('/users/change-password', {
                current_password: passwordData.current_password,
                new_password: passwordData.new_password
            });
            setMessage('Password changed successfully');
            setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
            setPasswordMode(false);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Password change failed');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await API.delete('/users/account');
                localStorage.removeItem('user');
                navigate('/login');
            } catch (err) {
                setError('Account deletion failed');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const menuItems = [
        { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
        { path: '/properties', icon: '🏘️', label: 'Properties' },
        { path: '/bonds', icon: '💰', label: 'Bonds' },
        { path: '/inspections', icon: '📋', label: 'Inspections' },
        { path: '/documents', icon: '📄', label: 'Documents' },
        { path: '/profile', icon: '👤', label: 'Profile' },
    ];

    if (loading) {
        return <div style={styles.loading}>Loading profile...</div>;
    }

    return (
        <div style={styles.app}>
            <video autoPlay loop muted playsInline style={styles.videoBg}>
                <source src="/videos/background.mp4" type="video/mp4" />
            </video>
            <div style={styles.overlay}></div>

            <div style={{ ...styles.sidebar, width: sidebarOpen ? '280px' : '80px' }}>
                <div style={styles.sidebarHeader}>
                    <span style={styles.logoIcon}>🏠</span>
                    {sidebarOpen && <span style={styles.logoText}>Rental Bond Tracker</span>}
                    <button onClick={toggleSidebar} style={styles.toggleBtn}>{sidebarOpen ? '◀' : '▶'}</button>
                </div>
                <nav style={styles.nav}>
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} style={styles.navItem}>
                            <span style={styles.navIcon}>{item.icon}</span>
                            {sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}
                        </Link>
                    ))}
                </nav>
                <div style={styles.sidebarFooter}>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <span>🚪</span>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>

            <div style={{ ...styles.main, marginLeft: sidebarOpen ? '280px' : '80px' }}>
                <div style={styles.header}>
                    <h1 style={styles.title}>👤 My Profile</h1>
                </div>

                {message && <div style={styles.successMessage}>{message}</div>}
                {error && <div style={styles.errorMessage}>{error}</div>}

                <div style={styles.profileCard}>
                    <div style={styles.avatarSection}>
                        <div style={styles.avatar}>
                            {user?.full_name?.charAt(0) || 'U'}
                        </div>
                        <h2 style={styles.userName}>{user?.full_name}</h2>
                        <p style={styles.userEmail}>{user?.email}</p>
                    </div>

                    <div style={styles.infoSection}>
                        {!editMode && !passwordMode ? (
                            <>
                                <div style={styles.infoRow}>
                                    <span style={styles.infoLabel}>📧 Email:</span>
                                    <span>{user?.email}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <span style={styles.infoLabel}>📱 Phone:</span>
                                    <span>{user?.phone || 'Not provided'}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <span style={styles.infoLabel}>📅 Member since:</span>
                                    <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
                                </div>
                                <div style={styles.buttonGroup}>
                                    <button onClick={() => setEditMode(true)} style={styles.editBtn}>✏️ Edit Profile</button>
                                    <button onClick={() => setPasswordMode(true)} style={styles.passwordBtn}>🔒 Change Password</button>
                                    <button onClick={handleDeleteAccount} style={styles.deleteAccountBtn}>🗑️ Delete Account</button>
                                </div>
                            </>
                        ) : editMode ? (
                            <form onSubmit={handleUpdateProfile}>
                                <div style={styles.formGroup}>
                                    <label>Full Name</label>
                                    <input type="text" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} required style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={styles.input} />
                                </div>
                                <div style={styles.buttonGroup}>
                                    <button type="submit" style={styles.saveBtn}>Save Changes</button>
                                    <button type="button" onClick={() => setEditMode(false)} style={styles.cancelBtn}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleChangePassword}>
                                <div style={styles.formGroup}>
                                    <label>Current Password</label>
                                    <input type="password" value={passwordData.current_password} onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })} required style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>New Password (min 8 characters)</label>
                                    <input type="password" value={passwordData.new_password} onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })} required style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Confirm New Password</label>
                                    <input type="password" value={passwordData.confirm_password} onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })} required style={styles.input} />
                                </div>
                                <div style={styles.buttonGroup}>
                                    <button type="submit" style={styles.saveBtn}>Change Password</button>
                                    <button type="button" onClick={() => setPasswordMode(false)} style={styles.cancelBtn}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    app: { minHeight: '100vh', position: 'relative', display: 'flex' },
    videoBg: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 },
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1 },
    sidebar: { position: 'fixed', top: 0, left: 0, height: '100vh', background: 'rgba(26,26,46,0.9)', backdropFilter: 'blur(15px)', color: 'white', transition: 'width 0.3s', display: 'flex', flexDirection: 'column', zIndex: 100, borderRight: '1px solid rgba(255,255,255,0.1)' },
    sidebarHeader: { padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
    logoIcon: { fontSize: '28px' }, logoText: { fontSize: '18px', fontWeight: 'bold', flex: 1 },
    toggleBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer' },
    nav: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' },
    navItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', color: 'rgba(255,255,255,0.8)' },
    navIcon: { fontSize: '20px' }, navLabel: { fontSize: '15px' },
    sidebarFooter: { padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' },
    logoutBtn: { display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(220,38,38,0.3)', border: 'none', color: '#f87171', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', width: '100%' },
    main: { flex: 1, padding: '24px', transition: 'margin-left 0.3s', position: 'relative', zIndex: 10 },
    header: { marginBottom: '24px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.2)' },
    profileCard: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '32px', maxWidth: '600px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.2)' },
    avatarSection: { textAlign: 'center', marginBottom: '32px' },
    avatar: { width: '100px', height: '100px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold', color: 'white', margin: '0 auto 16px', border: '3px solid rgba(255,255,255,0.3)' },
    userName: { fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0 0 8px' },
    userEmail: { fontSize: '14px', color: 'rgba(255,255,255,0.7)' },
    infoSection: { borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '24px' },
    infoRow: { display: 'flex', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '16px', color: 'white' },
    infoLabel: { width: '140px', fontWeight: 'bold', opacity: 0.8 },
    formGroup: { marginBottom: '16px' },
    label: { display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'white', marginBottom: '8px' },
    input: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none' },
    buttonGroup: { display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' },
    editBtn: { background: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', flex: 1 },
    passwordBtn: { background: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', flex: 1 },
    deleteAccountBtn: { background: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', flex: 1 },
    saveBtn: { background: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', flex: 1 },
    cancelBtn: { background: '#6b7280', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', flex: 1 },
    successMessage: { background: 'rgba(16,185,129,0.9)', color: 'white', padding: '12px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' },
    errorMessage: { background: 'rgba(220,38,38,0.9)', color: 'white', padding: '12px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' },
    loading: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '18px' }
};

export default Profile;