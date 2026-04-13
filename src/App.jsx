import { useState, useCallback } from 'react';
import { ClipboardList, BarChart, TrendingUp } from 'lucide-react';
import './App.css';
import NilaiPage from './pages/NilaiPage';
import RataRataPage from './pages/RataRataPage';
import Toast from './components/Toast';

let toastId = 0;

export default function App() {
  const [activeTab, setActiveTab] = useState('nilai');
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="app-wrapper">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-brand-icon">
            <ClipboardList size={22} style={{ marginBottom: -2 }} />
          </div>
          <span>Converter Nilai Raport</span>
          <span className="navbar-badge">V2.0 Web</span>
        </div>

        <div className="navbar-tabs">
          <button
            className={`navbar-tab tab-nilai ${activeTab === 'nilai' ? 'active' : ''}`}
            onClick={() => setActiveTab('nilai')}
          >
            <BarChart size={18} style={{ marginRight: 6 }} /> Menu Nilai
          </button>
          <button
            className={`navbar-tab tab-rata ${activeTab === 'rata' ? 'active' : ''}`}
            onClick={() => addToast('info', 'Menu Rata-Rata sedang dalam pengembangan lebih lanjut (Under Construction) 🚧')}
          >
            <TrendingUp size={18} style={{ marginRight: 6 }} /> Menu Rata-Rata
          </button>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          by <span style={{ color: 'var(--accent-green)' }}>ADR Programming</span>
        </div>
      </nav>

      {/* ── Mobile Tabs ── */}
      <div style={{
        display: 'none',
        padding: '12px 16px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        gap: 8
      }} className="mobile-tabs">
        <button
          style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', background: activeTab === 'nilai' ? 'var(--accent-blue)' : 'transparent', color: activeTab === 'nilai' ? 'white' : 'var(--text-secondary)', fontWeight: 600, fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          onClick={() => setActiveTab('nilai')}
        ><BarChart size={16} /> Nilai</button>
        <button
          style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', background: activeTab === 'rata' ? 'var(--accent-purple)' : 'transparent', color: activeTab === 'rata' ? 'white' : 'var(--text-secondary)', fontWeight: 600, fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          onClick={() => addToast('info', 'Menu Rata-Rata sedang dalam pengembangan lebih lanjut (Under Construction) 🚧')}
        ><TrendingUp size={16} /> Rata-Rata</button>
      </div>

      {/* ── Main Content ── */}
      <main className="main-content">
        {activeTab === 'nilai'
          ? <NilaiPage addToast={addToast} />
          : <RataRataPage addToast={addToast} />
        }
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        Dibuat dan Dikembangkan oleh <span>Team ADR Programming</span> · Converter Nilai Raport V2.0 Web
      </footer>

      {/* ── Toasts ── */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
