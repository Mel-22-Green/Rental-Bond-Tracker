import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Documents() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', file: null });
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) navigate('/login');
        else fetchDocuments();
    }, [navigate]);

    const fetchDocuments = async () => {
        try { const res = await API.get('/documents'); setDocuments(res.data); } catch (error) { }
        finally { setLoading(false); }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('file', formData.file);
        try { await API.post('/documents/upload', data); fetchDocuments(); setShowForm(false); setFormData({ title: '', file: null }); } catch (error) { alert('Failed to upload document'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this document?')) { await API.delete(`/documents/${id}`); fetchDocuments(); }
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
                <div style={styles.header}><h1 style={styles.title}>📄 Documents</h1><button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>{showForm ? 'Cancel' : '+ Upload Document'}</button></div>

                {showForm && (
                    <div style={styles.formCard}>
                        <h3 style={styles.formTitle}>Upload Document</h3>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <input type="text" placeholder="Document Title" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={styles.input} />
                            <input type="file" onChange={handleFileChange} required style={styles.fileInput} />
                            <button type="submit" style={styles.submitBtn}>Upload</button>
                        </form>
                    </div>
                )}

                {loading ? <div style={styles.loading}>Loading...</div> : documents.length === 0 ? (
                    <div style={styles.emptyState}><div style={styles.emptyIcon}>📄</div><p>No documents uploaded yet</p><button onClick={() => setShowForm(true)} style={styles.emptyBtn}>Upload Your First Document</button></div>
                ) : (
                    <div style={styles.list}>{documents.map(doc => (
                        <div key={doc.document_id} style={styles.listItem}>
                            <div style={styles.listItemIcon}>📄</div>
                            <div style={styles.listItemContent}><h3 style={styles.listItemTitle}>{doc.title}</h3><p style={styles.listItemDate}>Uploaded: {doc.uploaded_at?.split('T')[0]}</p></div>
                            <div style={styles.listItemActions}><button style={styles.downloadBtn}>⬇️ Download</button><button onClick={() => handleDelete(doc.document_id)} style={styles.deleteBtn}>🗑️ Delete</button></div>
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
    input: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px', outline: 'none' },
    fileInput: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', color: 'white' },
    submitBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px', border: 'none', borderRadius: '12px', cursor: 'pointer' },
    list: { display: 'flex', flexDirection: 'column', gap: '12px' },
    listItem: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(255,255,255,0.2)' },
    listItemIcon: { fontSize: '32px' }, listItemContent: { flex: 1 }, listItemTitle: { fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 }, listItemDate: { fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' },
    listItemActions: { display: 'flex', gap: '8px' },
    downloadBtn: { background: 'rgba(102,126,234,0.8)', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
    deleteBtn: { background: 'rgba(220,38,38,0.8)', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
    emptyState: { textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' },
    emptyIcon: { fontSize: '64px', marginBottom: '16px' }, emptyBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '16px' },
    loading: { textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' },
};

export default Documents;