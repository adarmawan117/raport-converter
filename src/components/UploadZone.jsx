import { useRef, useState } from 'react';
import { UploadCloud, FileSpreadsheet, X } from 'lucide-react';
import { formatFileSize } from '../utils';

export default function UploadZone({ onParse, onRemove, file, accept = '.csv,.xlsx,.xls' }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    onParse(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  return (
    <div>
      <div
        className={`upload-zone ${drag ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <div className="upload-icon"><UploadCloud size={48} color="var(--accent-blue)" /></div>
        <div className="upload-title">
          {drag ? 'Lepaskan file di sini' : 'Klik atau drag & drop file'}
        </div>
        <div className="upload-subtitle">
          Unggah file CSV atau Excel Anda
        </div>
        <div className="upload-formats">
          <span className="format-badge csv">CSV</span>
          <span className="format-badge xlsx">XLSX</span>
          <span className="format-badge xls">XLS</span>
        </div>
      </div>

      {file && (
        <div className="file-preview">
          <div className="file-preview-info">
            <span className="file-preview-icon"><FileSpreadsheet size={24} color="var(--accent-teal)" /></span>
            <div>
              <div className="file-preview-name">{file.name}</div>
              <div className="file-preview-size">{formatFileSize(file.size)}</div>
            </div>
          </div>
          <button className="file-remove-btn" onClick={onRemove} title="Hapus file"><X size={16} /></button>
        </div>
      )}
    </div>
  );
}
