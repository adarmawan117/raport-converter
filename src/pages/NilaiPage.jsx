import { useState } from 'react';
import { BarChart, Download, Eye, Users, Columns, Settings, Zap, CheckCircle, FileText, Table, Loader2 } from 'lucide-react';
import UploadZone from '../components/UploadZone';
import DataTable from '../components/DataTable';
import StepIndicator from '../components/StepIndicator';
import { parseFile, processNilai, downloadCSV, downloadExcel, downloadNilaiTemplate } from '../utils';

const STEPS = ['Upload File', 'Preview Data', 'Download Hasil'];

export default function NilaiPage({ addToast }) {
  const [file, setFile] = useState(null);
  const [inputRows, setInputRows] = useState([]);
  const [outputRows, setOutputRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const handleParse = async (f) => {
    setLoading(true);
    try {
      const rows = await parseFile(f);
      if (rows.length <= 1) throw new Error('File kosong atau hanya berisi header');
      setFile(f);
      
      // Abaikan baris pertama (header dari excel/csv)
      const dataRows = rows.slice(1);
      
      // Bangun header untuk preview
      const maxCols = Math.max(...dataRows.map(r => r.length));
      const colCount = maxCols > 1 ? maxCols - 1 : 0;
      const previewHeader = ['Nama Siswa', ...Array.from({ length: colCount }, (_, i) => `Nilai ${i + 1}`)];
      
      const preview = [previewHeader, ...dataRows];
      setInputRows(preview);
      setOutputRows([]);
      setStep(1);
      addToast('success', `Berhasil membaca ${dataRows.length} data siswa`);
    } catch (err) {
      addToast('error', err.message);
    }
    setLoading(false);
  };

  const handleRemove = () => {
    setFile(null);
    setInputRows([]);
    setOutputRows([]);
    setStep(0);
  };

  const handleProcess = () => {
    try {
      // inputRows[0] is the header we added, skip it; real rows start at index 1
      const realRows = inputRows.slice(1);
      if (realRows.length === 0) throw new Error('Tidak ada data untuk diproses');
      const result = processNilai(realRows);
      setOutputRows(result);
      setStep(2);
      const totalValues = result.length - 1; // exclude header
      addToast('success', `Berhasil memproses ${realRows.length} siswa → ${totalValues} baris output`);
    } catch (err) {
      addToast('error', err.message);
    }
  };

  const handleDownloadCSV = () => {
    downloadCSV(outputRows, 'hasil_nilai.csv');
    addToast('success', 'File hasil_nilai.csv berhasil diunduh');
  };
  const handleDownloadExcel = () => {
    downloadExcel(outputRows, 'hasil_nilai.xlsx');
    addToast('success', 'File hasil_nilai.xlsx berhasil diunduh');
  };
  const handleTemplate = () => {
    downloadNilaiTemplate();
    addToast('info', 'Template template_nilai.xlsx diunduh');
  };

  const studentCount = inputRows.length > 1 ? inputRows.length - 1 : 0;
  const colCount = inputRows.length > 0 ? Math.max(...inputRows.map(r => r.length)) - 1 : 0;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="page-title">
          <span className="page-title-icon"><BarChart size={24} /></span>
          Menu Nilai
        </div>
        <p className="page-subtitle">
          Konversi daftar tabel siswa menjadi nilai menurun secara vertikal sesuai format cetak satu raport per halaman.
        </p>
      </div>

      <StepIndicator steps={STEPS} current={step} />

      <div className="grid-2" style={{ gap: 24 }}>
        {/* ── LEFT: Input ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Upload Card */}
          <div className="card">
            <div className="card-header">
              <button className="btn btn-outline btn-sm" onClick={handleTemplate}>
                <Download size={16} className="btn-icon" /> Download Template
              </button>
            </div>

            <UploadZone
              file={file}
              onParse={handleParse}
              onRemove={handleRemove}
            />

            {loading && (
              <p className="helper-text" style={{ marginTop: 10, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Loader2 size={16} className="animate-spin" /> Membaca file...
              </p>
            )}

            <div className="divider" />
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
                  <span className="stat-chip teal"><Columns size={14} /> {colCount} Kolom nilai</span>
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
                <div className="card-icon icon-amber"><Settings size={20} /></div>
                Proses Data
              </div>
            </div>



            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              onClick={handleProcess}
              disabled={inputRows.length === 0}
            >
              <Zap size={20} className="btn-icon" />
              Proses & Generate Output
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
                Klik <strong style={{ color: 'var(--text-secondary)' }}>Proses</strong> untuk melihat hasil output
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
