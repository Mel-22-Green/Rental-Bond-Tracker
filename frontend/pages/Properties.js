import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ address: '', landlord_name: '', landlord_phone: '', landlord_email: '', agent_name: '', agent_phone: '', lease_start: '', lease_end: '', is_current: false });
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) navigate('/login');
        else fetchProperties();
    }, [navigate]);

    const fetchProperties = async () => {
        try { const res = await API.get('/properties'); setProperties(res.data); } catch (error) { }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { await API.post('/properties/add', formData); fetchProperties(); setShowForm(false); setFormData({ address: '', landlord_name: '', landlord_phone: '', landlord_email: '', agent_name: '', agent_phone: '', lease_start: '', lease_end: '', is_current: false }); } catch (error) { alert('Failed to add property'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this property?')) { await API.delete(`/properties/${id}`); fetchProperties(); }
    };

    const handleLogout = () => { localStorage.removeItem('user'); navigate('/login'); };
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
            <video autoPlay loop muted playsInline style={styles.videoBg}><source src="/videos/background.mp4" type="video/mp4" /></video>
            <div style={styles.overlay}></div>

            <div style={{ ...styles.sidebar, width: sidebarOpen ? '280px' : '80px' }}>
                <div style={styles.sidebarHeader}><span style={styles.logoIcon}>🏠</span>{sidebarOpen && <span style={styles.logoText}>Rental Bond Tracker</span>}<button onClick={toggleSidebar} style={styles.toggleBtn}>{sidebarOpen ? '◀' : '▶'}</button></div>
                <nav style={styles.nav}>{menuItems.map((item) => (<Link key={item.path} to={item.path} style={styles.navItem}><span style={styles.navIcon}>{item.icon}</span>{sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}</Link>))}</nav>
                <div style={styles.sidebarFooter}><button onClick={handleLogout} style={styles.logoutBtn}><span>🚪</span>{sidebarOpen && <span>Logout</span>}</button></div>
            </div>

            <div style={{ ...styles.main, marginLeft: sidebarOpen ? '280px' : '80px' }}>
                <div style={styles.header}><h1 style={styles.title}>🏘️ Properties</h1><button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>{showForm ? 'Cancel' : '+ Add Property'}</button></div>

                {showForm && (
                    <div style={styles.formCard}>
                        <h3 style={styles.formTitle}>Add New Property</h3>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <input type="text" name="address" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required style={styles.input} />
                            <div style={styles.row}><input type="text" placeholder="Landlord Name" onChange={(e) => setFormData({ ...formData, landlord_name: e.target.value })} required style={{ ...styles.input, flex: 1 }} /><input type="tel" placeholder="Landlord Phone" onChange={(e) => setFormData({ ...formData, landlord_phone: e.target.value })} style={{ ...styles.input, flex: 1 }} /></div>
                            <button type="submit" style={styles.submitBtn}>Save Property</button>
                        </form>
                    </div>
                )}

                {loading ? <div style={styles.loading}>Loading...</div> : properties.length === 0 ? (
                    <div style={styles.emptyState}><div style={styles.emptyIcon}>🏘️</div><p>No properties added yet</p><button onClick={() => setShowForm(true)} style={styles.emptyBtn}>Add Your First Property</button></div>
                ) : (
                    <div style={styles.grid}>{properties.map(prop => (
                        <div key={prop.property_id} style={styles.card}>
                            <div style={styles.cardHeader}><span style={styles.cardIcon}>🏘️</span><h3 style={styles.cardTitle}>{prop.address?.split(',')[0] || 'Property'}</h3></div>
                            <div style={styles.cardBody}><p><strong>Landlord:</strong> {prop.landlord_name}</p><p><strong>Agent:</strong> {prop.agent_name || 'N/A'}</p><p><strong>Lease:</strong> {prop.lease_start || '?'} → {prop.lease_end || '?'}</p></div>
                            <div style={styles.cardActions}><button onClick={() => { }} style={styles.editBtn}>Edit</button><button onClick={() => handleDelete(prop.property_id)} style={styles.deleteBtn}>Delete</button></div>
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
    submitBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '8px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
    card: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.2)' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
    cardIcon: { fontSize: '32px' }, cardTitle: { fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 },
    cardBody: { fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' },
    cardActions: { display: 'flex', gap: '12px' },
    editBtn: { flex: 1, background: 'rgba(102,126,234,0.8)', color: 'white', padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer' },
    deleteBtn: { flex: 1, background: 'rgba(220,38,38,0.8)', color: 'white', padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer' },
    emptyState: { textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' },
    emptyIcon: { fontSize: '64px', marginBottom: '16px' }, emptyBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '16px' },
    loading: { textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' },
};

export default Properties;