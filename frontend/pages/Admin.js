import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Admin() {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [bonds, setBonds] = useState([]);
    const [inspections, setInspections] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Define fetchAllData BEFORE using it in useEffect
    const fetchAllData = async () => {
        try {
            const [usersRes, propsRes, bondsRes, inspRes] = await Promise.all([
                API.get('/admin/users'),
                API.get('/admin/properties'),
                API.get('/admin/bonds'),
                API.get('/admin/inspections')
            ]);
            setUsers(usersRes.data || []);
            setProperties(propsRes.data || []);
            setBonds(bondsRes.data || []);
            setInspections(inspRes.data || []);
        } catch (err) {
            console.error('Error fetching data:', err);
            if (err.response?.status === 403 || err.response?.status === 401) {
                navigate('/admin-login');
            }
        } finally {
            setLoading(false);
        }
    };

    // useEffect runs after component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin');

        console.log('Token:', token);
        console.log('isAdmin:', isAdmin);

        if (!token || isAdmin !== 'true') {
            navigate('/admin-login');
            return;
        }

        fetchAllData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <h2>Loading Admin Dashboard...</h2>
                <p>Please wait while we load your data.</p>
            </div>
        );
    }

    return (
        <div style={styles.app}>
            <div style={styles.sidebar}>
                <div style={styles.logo}>👑 Admin Panel</div>
                <nav style={styles.nav}>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{ ...styles.navBtn, background: activeTab === 'users' ? '#667eea' : 'transparent' }}
                    >
                        👥 Users ({users.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('properties')}
                        style={{ ...styles.navBtn, background: activeTab === 'properties' ? '#667eea' : 'transparent' }}
                    >
                        🏘️ Properties ({properties.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('bonds')}
                        style={{ ...styles.navBtn, background: activeTab === 'bonds' ? '#667eea' : 'transparent' }}
                    >
                        💰 Bonds ({bonds.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('inspections')}
                        style={{ ...styles.navBtn, background: activeTab === 'inspections' ? '#667eea' : 'transparent' }}
                    >
                        📋 Inspections ({inspections.length})
                    </button>
                </nav>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>

            <div style={styles.main}>
                <h1 style={styles.title}>Admin Dashboard</h1>

                {activeTab === 'users' && (
                    <div style={styles.tableContainer}>
                        <h2>All Tenants</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.full_name}</td>
                                        <td>{user.email}</td>
                                        <td><span style={{ ...styles.badge, background: user.role === 'admin' ? '#dc2626' : '#10b981' }}>{user.role}</span></td>
                                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'properties' && (
                    <div style={styles.tableContainer}>
                        <h2>All Properties (All Tenants)</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr><th>ID</th><th>Owner</th><th>Address</th><th>Landlord</th><th>Current</th></tr>
                            </thead>
                            <tbody>
                                {properties.map(prop => (
                                    <tr key={prop.property_id}>
                                        <td>{prop.property_id}</td>
                                        <td>{prop.owner_name || 'Unknown'}</td>
                                        <td>{prop.address}</td>
                                        <td>{prop.landlord_name}</td>
                                        <td>{prop.is_current ? '✅' : '❌'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'bonds' && (
                    <div style={styles.tableContainer}>
                        <h2>All Bonds (All Tenants)</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr><th>ID</th><th>Owner</th><th>Property</th><th>Amount</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {bonds.map(bond => (
                                    <tr key={bond.bond_id}>
                                        <td>{bond.bond_id}</td>
                                        <td>{bond.owner_name}</td>
                                        <td>{bond.property_address || '-'}</td>
                                        <td>${bond.amount}</td>
                                        <td><span style={{ ...styles.badge, background: bond.status === 'Paid' ? '#10b981' : '#f59e0b' }}>{bond.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'inspections' && (
                    <div style={styles.tableContainer}>
                        <h2>All Inspections (All Tenants)</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr><th>ID</th><th>Owner</th><th>Property</th><th>Date</th><th>Type</th><th>Rating</th></tr>
                            </thead>
                            <tbody>
                                {inspections.map(insp => (
                                    <tr key={insp.inspection_id}>
                                        <td>{insp.inspection_id}</td>
                                        <td>{insp.owner_name}</td>
                                        <td>{insp.property_address || '-'}</td>
                                        <td>{insp.inspection_date}</td>
                                        <td>{insp.inspection_type}</td>
                                        <td>{'⭐'.repeat(insp.rating) || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    app: { display: 'flex', minHeight: '100vh', background: '#0f0f1a' },
    sidebar: { width: '260px', background: '#1a1a2e', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    logo: { fontSize: '24px', fontWeight: 'bold', color: '#667eea', textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #333' },
    nav: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
    navBtn: { padding: '12px', borderRadius: '8px', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', fontSize: '14px' },
    logoutBtn: { padding: '12px', background: '#dc2626', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', marginTop: '20px' },
    main: { flex: 1, padding: '30px', overflowX: 'auto' },
    title: { color: 'white', marginBottom: '20px' },
    tableContainer: { background: '#1a1a2e', borderRadius: '12px', padding: '20px', overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', color: 'white' },
    tableTh: { textAlign: 'left', padding: '12px', borderBottom: '1px solid #333' },
    tableTd: { textAlign: 'left', padding: '12px', borderBottom: '1px solid #222' },
    badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', color: 'white' },
    loading: { textAlign: 'center', padding: '50px', color: 'white' },
};

export default Admin;