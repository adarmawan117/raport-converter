import { useState } from 'react';
import { TrendingUp, Download, Settings, Search, Eye, Users, Columns, Zap, CheckCircle, FileText, Table } from 'lucide-react';
import UploadZone from '../components/UploadZone';
import DataTable from '../components/DataTable';
import StepIndicator from '../components/StepIndicator';
import { parseFile, processRataRata, downloadCSV, downloadExcel, downloadRataRataTemplate } from '../utils';

const STEPS = ['Upload File', 'Konfigurasi', 'Download Hasil'];

export default function RataRataPage({ addToast }) {
  const [file, setFile] = useState(null);
  const [inputRows, setInputRows] = useState([]);
  const [outputRows, setOutputRows] = useState([]);
  const [qty, setQty] = useState(20);
  const [step, setStep] = useState(0);

  const handleParse = async (f) => {
    try {
      const rows = await parseFile(f);
      if (rows.length <= 1) throw new Error('File kosong atau hanya berisi header');
      setFile(f);
      
      // Abaikan baris pertama (header bawaan dari excel/csv)
      const dataRows = rows.slice(1);
      
      // Build preview header from max columns of dataRows
      const maxCols = Math.max(...dataRows.map(r => r.length));
      const autoQty = maxCols > 1 ? maxCols - 1 : qty;
      setQty(autoQty);
      const header = ['Nama Siswa', ...Array.from({ length: maxCols - 1 }, (_, i) => `Rata-Rata ${i + 1}`)];
      const preview = [header, ...dataRows];
      setInputRows(preview);
      setOutputRows([]);
      setStep(1);
      addToast('success', `Berhasil membaca ${dataRows.length} data siswa (${autoQty} rata-rata per siswa)`);
    } catch (err) {
      addToast('error', err.message);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setInputRows([]);
    setOutputRows([]);
    setStep(0);
  };

  const handleProcess = () => {
    try {
      const realRows = inputRows.slice(1); // skip header
      if (realRows.length === 0) throw new Error('Tidak ada data untuk diproses');
      if (qty < 1) throw new Error('Jumlah rata-rata per siswa harus minimal 1');
      const result = processRataRata(realRows, qty);
      setOutputRows(result);
      setStep(2);
      addToast('success', `Berhasil memproses ${realRows.length} siswa → ${result.length - 1} baris output`);
    } catch (err) {
      addToast('error', err.message);
    }
  };

  const handleDownloadCSV = () => {
    downloadCSV(outputRows, 'hasil_rata_rata.csv');
    addToast('success', 'File hasil_rata_rata.csv berhasil diunduh');
  };
  const handleDownloadExcel = () => {
    downloadExcel(outputRows, 'hasil_rata_rata.xlsx');
    addToast('success', 'File hasil_rata_rata.xlsx berhasil diunduh');
  };
  const handleTemplate = () => {
    downloadRataRataTemplate(qty || 20);
    addToast('info', 'Template template_rata_rata.xlsx diunduh');
  };

  const studentCount = inputRows.length > 1 ? inputRows.length - 1 : 0;
  const detectedCols = inputRows.length > 0 ? Math.max(...inputRows.map(r => r.length)) - 1 : 0;

  const changeQty = (delta) => {
    setQty(prev => Math.min(100, Math.max(1, prev + delta)));
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="page-title">
          <span className="page-title-icon"><TrendingUp size={24} /></span>
          Menu Rata-Rata
        </div>
        <p className="page-subtitle">
          Konversi daftar rata-rata siswa menjadi nilai menurun secara vertikal sesuai format cetak.
        </p>
      </div>

      <StepIndicator steps={STEPS} current={step} />

      <div className="grid-2" style={{ gap: 24 }}>
        {/* ── LEFT: Input + Config ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Upload Card */}
          <div className="card">
            <div className="card-header">
              <button className="btn btn-outline btn-sm" onClick={handleTemplate}>
                <Download size={16} className="btn-icon" /> Download Template
              </button>
            </div>

            <UploadZone file={file} onParse={handleParse} onRemove={handleRemove} />


          </div>

          {/* Config: qty */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon icon-purple"><Settings size={20} /></div>
                Konfigurasi
              </div>
              {detectedCols > 0 && (
                <span className="stat-chip purple"><Search size={14} /> Terdeteksi {detectedCols} kolom</span>
              )}
            </div>

            <div className="spinner-config">
              <label>
                <strong>Banyak rata-rata per siswa</strong><br />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Berapa kolom rata-rata yang diambil dari setiap baris siswa
                </span>
              </label>
              <button className="spinner-btn" onClick={() => changeQty(-1)}>−</button>
              <input
                type="number"
                className="spinner-input"
                value={qty}
                min={1}
                max={100}
                onChange={e => setQty(Math.min(100, Math.max(1, Number(e.target.value))))}
              />
              <button className="spinner-btn" onClick={() => changeQty(1)}>+</button>
            </div>
          </div>

          {/* Preview Input */}
          {inputRows.length > 0 && (
            <div className="card animate-slide-in">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon icon-teal"><Eye size={20} /></div>
                  Preview Input
                </div>
                <div className="stats-row">
                  <span className="stat-chip blue"><Users size={14} /> {studentCount} Siswa</span>
                  <span className="stat-chip purple"><Columns size={14} /> {qty} rata-rata/siswa</span>
                </div>
              </div>
              <DataTable rows={inputRows} maxRows={30} />
            </div>
          )}
        </div>

        {/* ── RIGHT: Output ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Process Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon icon-amber"><Zap size={20} /></div>
                Proses Data
              </div>
            </div>



            <button
              className="btn btn-purple btn-lg"
              style={{ width: '100%' }}
              onClick={handleProcess}
              disabled={inputRows.length === 0}
            >
              <Zap size={20} className="btn-icon" />
              Proses &amp; Generate Output
            </button>
          </div>

          {/* Output Preview + Download */}
          {outputRows.length > 0 && (
            <div className="card animate-slide-in" style={{ borderColor: 'rgba(34,197,94,0.3)' }}>
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon icon-green"><CheckCircle size={20} /></div>
                  Hasil Output
                </div>
                <span className="stat-chip teal"><FileText size={14} /> {outputRows.length - 1} baris</span>
              </div>

              <DataTable rows={outputRows} maxRows={50} />

              <div className="divider" />

              <div className="output-actions">
                <button className="btn btn-teal btn-lg" onClick={handleDownloadCSV} style={{ flex: 1 }}>
                  <Download size={20} className="btn-icon" /> Download CSV
                </button>
                <button className="btn btn-green btn-lg" onClick={handleDownloadExcel} style={{ flex: 1 }}>
                  <Table size={20} className="btn-icon" /> Download Excel
                </button>
              </div>
            </div>
          )}

          {inputRows.length > 0 && outputRows.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div className="table-empty-icon"><Settings size={32} /></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 8 }}>
                Atur konfigurasi lalu klik <strong style={{ color: 'var(--text-secondary)' }}>Proses</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
