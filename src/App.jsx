import { useState, useCallback } from 'react';
import { ClipboardList, BarChart, TrendingUp } from 'lucide-react';
import './App.css';
import NilaiPage from './pages/NilaiPage';
import Toast from './components/Toast';

let toastId = 0;

export default function App() {
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



        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          by <span style={{ color: 'var(--accent-green)' }}>ADR Programming</span>
        </div>
      </nav>



      {/* ── Main Content ── */}
      <main className="main-content">
        <NilaiPage addToast={addToast} />
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
