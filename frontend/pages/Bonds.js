import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Bonds() {
    const [bonds, setBonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ property_id: '', amount: '', payment_date: '', reference_no: '', status: 'Pending' });
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) navigate('/login');
        else { fetchBonds(); fetchProperties(); }
    }, [navigate]);

    const fetchBonds = async () => {
        try { const res = await API.get('/bonds'); setBonds(res.data); } catch (error) { }
        finally { setLoading(false); }
    };

    const fetchProperties = async () => {
        try { const res = await API.get('/properties'); setProperties(res.data); } catch (error) { }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { await API.post('/bonds/add', formData); fetchBonds(); setShowForm(false); setFormData({ property_id: '', amount: '', payment_date: '', reference_no: '', status: 'Pending' }); } catch (error) { alert('Failed to add bond'); }
    };

    const handleLogout = () => { localStorage.removeItem('user'); navigate('/login'); };
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const getStatusColor = (status) => {
        if (status === 'Paid') return '#10b981';
        if (status === 'Pending') return '#f59e0b';
        return '#ef4444';
    };

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
            <video autoPlay loop muted playsInline style={styles.videoBg}><source src="/videos/background.mp4" type="video/mp4" /></video>
            <div style={styles.overlay}></div>

            <div style={{ ...styles.sidebar, width: sidebarOpen ? '280px' : '80px' }}>
                <div style={styles.sidebarHeader}><span style={styles.logoIcon}>🏠</span>{sidebarOpen && <span style={styles.logoText}>Rental Bond Tracker</span>}<button onClick={toggleSidebar} style={styles.toggleBtn}>{sidebarOpen ? '◀' : '▶'}</button></div>
                <nav style={styles.nav}>{menuItems.map((item) => (<Link key={item.path} to={item.path} style={styles.navItem}><span style={styles.navIcon}>{item.icon}</span>{sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}</Link>))}</nav>
                <div style={styles.sidebarFooter}><button onClick={handleLogout} style={styles.logoutBtn}><span>🚪</span>{sidebarOpen && <span>Logout</span>}</button></div>
            </div>

            <div style={{ ...styles.main, marginLeft: sidebarOpen ? '280px' : '80px' }}>
                <div style={styles.header}><h1 style={styles.title}>💰 Bonds</h1><button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>{showForm ? 'Cancel' : '+ Record Bond'}</button></div>

                {showForm && (
                    <div style={styles.formCard}>
                        <h3 style={styles.formTitle}>Record New Bond</h3>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <select onChange={(e) => setFormData({ ...formData, property_id: e.target.value })} required style={styles.input}><option value="">Select Property</option>{properties.map(p => <option key={p.property_id} value={p.property_id}>{p.address?.split(',')[0]}</option>)}</select>
                            <div style={styles.row}><input type="number" placeholder="Amount ($)" onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required style={{ ...styles.input, flex: 1 }} /><input type="date" onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })} required style={{ ...styles.input, flex: 1 }} /></div>
                            <input type="text" placeholder="Reference Number" onChange={(e) => setFormData({ ...formData, reference_no: e.target.value })} style={styles.input} />
                            <select onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={styles.input}><option value="Pending">Pending</option><option value="Paid">Paid</option><option value="Refunded">Refunded</option></select>
                            <button type="submit" style={styles.submitBtn}>Save Bond</button>
                        </form>
                    </div>
                )}

                {loading ? <div style={styles.loading}>Loading...</div> : bonds.length === 0 ? (
                    <div style={styles.emptyState}><div style={styles.emptyIcon}>💰</div><p>No bonds recorded yet</p><button onClick={() => setShowForm(true)} style={styles.emptyBtn}>Record Your First Bond</button></div>
                ) : (
                    <div style={styles.grid}>{bonds.map(bond => (
                        <div key={bond.bond_id} style={styles.card}>
                            <div style={styles.cardHeader}><span style={styles.cardIcon}>💰</span><div><h3 style={styles.cardTitle}>${bond.amount}</h3><span style={{ ...styles.statusBadge, background: getStatusColor(bond.status) }}>{bond.status}</span></div></div>
                            <div style={styles.cardBody}><p><strong>Property ID:</strong> {bond.property_id}</p><p><strong>Payment Date:</strong> {bond.payment_date}</p><p><strong>Reference:</strong> {bond.reference_no || 'N/A'}</p></div>
                        </div>
                    ))}</div>
                )}
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
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' },
    addBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer' },
    formCard: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.2)' },
    formTitle: { fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '16px' },
    form: { display: 'flex', flexDirection: 'column', gap: '12px' },
    row: { display: 'flex', gap: '12px' },
    input: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px', outline: 'none' },
    submitBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px', border: 'none', borderRadius: '12px', cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
    card: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.2)' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' },
    cardIcon: { fontSize: '40px' }, cardTitle: { fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 },
    statusBadge: { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: 'white', marginTop: '8px' },
    cardBody: { fontSize: '14px', color: 'rgba(255,255,255,0.8)' },
    emptyState: { textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' },
    emptyIcon: { fontSize: '64px', marginBottom: '16px' }, emptyBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '16px' },
    loading: { textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' },
};

export default Bonds;