import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
        fetchProperties();
    }, [navigate]);

    const fetchProperties = async () => {
        try {
            const response = await API.get('/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
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
                <div style={styles.topBar}>
                    <div>
                        <h1 style={styles.welcomeTitle}>Welcome back, {user?.full_name?.split(' ')[0] || 'User'}!</h1>
                        <p style={styles.welcomeSubtitle}>Here's what's happening with your rentals today.</p>
                    </div>
                </div>

                <div style={styles.statsGrid}>
                    <div style={styles.statCard}><span style={styles.statIcon}>🏘️</span><div><h3 style={styles.statNumber}>{properties.length}</h3><p style={styles.statLabel}>Properties</p></div></div>
                    <div style={styles.statCard}><span style={styles.statIcon}>💰</span><div><h3 style={styles.statNumber}>$2,500</h3><p style={styles.statLabel}>Active Bond</p></div></div>
                    <div style={styles.statCard}><span style={styles.statIcon}>📋</span><div><h3 style={styles.statNumber}>3</h3><p style={styles.statLabel}>Inspections</p></div></div>
                    <div style={styles.statCard}><span style={styles.statIcon}>📄</span><div><h3 style={styles.statNumber}>5</h3><p style={styles.statLabel}>Documents</p></div></div>
                </div>

                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>My Properties</h2>
                        <Link to="/properties" style={styles.addBtn}>+ Add Property</Link>
                    </div>
                    {loading ? <div style={styles.loading}>Loading...</div> : properties.length === 0 ? (
                        <div style={styles.emptyState}><div style={styles.emptyIcon}>🏠</div><p>No properties added yet</p><Link to="/properties" style={styles.emptyBtn}>Add Your First Property</Link></div>
                    ) : (
                        <div style={styles.propertyGrid}>
                            {properties.slice(0, 3).map(prop => (
                                <div key={prop.property_id} style={styles.propertyCard}>
                                    <div style={styles.propertyHeader}><span style={styles.propertyIcon}>🏘️</span><h3 style={styles.propertyAddress}>{prop.address?.split(',')[0] || 'Property'}</h3></div>
                                    <p><strong>Landlord:</strong> {prop.landlord_name}</p>
                                    <Link to={`/properties`} style={styles.viewBtn}>View Details →</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    app: { minHeight: '100vh', position: 'relative', display: 'flex' },
    videoBg: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 },
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', zIndex: 1 },
    sidebar: { position: 'fixed', top: 0, left: 0, height: '100vh', background: 'rgba(26,26,46,0.85)', backdropFilter: 'blur(15px)', color: 'white', transition: 'width 0.3s', display: 'flex', flexDirection: 'column', zIndex: 100, borderRight: '1px solid rgba(255,255,255,0.1)' },
    sidebarHeader: { padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
    logoIcon: { fontSize: '28px' }, logoText: { fontSize: '18px', fontWeight: 'bold', flex: 1 },
    toggleBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer' },
    nav: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' },
    navItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', color: 'rgba(255,255,255,0.8)' },
    navIcon: { fontSize: '20px' }, navLabel: { fontSize: '15px' },
    sidebarFooter: { padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' },
    logoutBtn: { display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(220,38,38,0.3)', border: 'none', color: '#f87171', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', width: '100%' },
    main: { flex: 1, padding: '24px', transition: 'margin-left 0.3s', position: 'relative', zIndex: 10 },
    topBar: { marginBottom: '28px' },
    welcomeTitle: { fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.2)' },
    welcomeSubtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '8px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' },
    statCard: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(255,255,255,0.2)' },
    statIcon: { fontSize: '32px' }, statNumber: { fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }, statLabel: { fontSize: '13px', color: 'rgba(255,255,255,0.7)' },
    section: { background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.15)' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    sectionTitle: { fontSize: '18px', fontWeight: 'bold', color: 'white' },
    addBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '8px 16px', borderRadius: '10px', textDecoration: 'none' },
    propertyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    propertyCard: { background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.15)' },
    propertyHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
    propertyIcon: { fontSize: '28px' }, propertyAddress: { fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 },
    viewBtn: { display: 'block', background: 'rgba(102,126,234,0.8)', color: 'white', textAlign: 'center', padding: '10px', borderRadius: '10px', textDecoration: 'none', marginTop: '12px' },
    emptyState: { textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.7)' },
    emptyIcon: { fontSize: '64px', marginBottom: '16px' }, emptyBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', display: 'inline-block', marginTop: '16px' },
    loading: { textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' },
};

export default Dashboard;