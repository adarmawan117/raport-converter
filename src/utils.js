import * as XLSX from 'xlsx';

/**
 * Parse uploaded file (CSV or Excel) → returns array of row arrays
 */
export async function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const ext = file.name.split('.').pop().toLowerCase();

    reader.onload = (e) => {
      try {
        const data = e.target.result;
        let rows = [];

        if (ext === 'csv') {
          // CSV: split by newline, then by tab
          const text = new TextDecoder('utf-8').decode(new Uint8Array(data));
          rows = text
            .split(/\r?\n/)
            .filter(line => line.trim() !== '')
            .map(line => line.split('\t'));
        } else {
          // Excel (xlsx / xls)
          const wb = XLSX.read(data, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
          rows = raw.filter(row => row.some(cell => String(cell).trim() !== ''));
        }

        resolve(rows);
      } catch (err) {
        reject(new Error('Gagal membaca file: ' + err.message));
      }
    };

    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Process NILAI data
 * Input rows: [name, val1, val2, ..., valN]
 * Output rows: [name, val1], ['', val2], ..., ['', valN], [name2, val1], ...
 */
export function processNilai(rows) {
  const output = [['Nama', 'Nilai']];
  for (const row of rows) {
    if (!row || row.length < 2) continue;
    const name = String(row[0]).trim();
    // Abaikan jika ternyata masih terbaca sebagai header (pengaman ekstra)
    if (name.toLowerCase() === 'nama siswa' || name.toLowerCase() === 'nama') continue;

    const values = row.slice(1).map(v => String(v).trim()).filter(v => v !== '');
    if (!name || values.length === 0) continue;

    values.forEach((val, idx) => {
      output.push([idx === 0 ? name : '', val]);
    });
  }
  return output;
}

/**
 * Process RATA-RATA data
 * Input rows: [name, rata1, rata2, ..., rataN]  (same as nilai)
 * Spinner qty controls how many rata-rata per student
 * Output format is same as processNilai but columns are: Nama, Nilai
 * Following Java logic: name\trata1\trata2\t...\trataN  (all on one row per student)
 * 
 * Actually output same transpose style:
 * Name, rata1
 * '', rata2
 * ...
 * '', rataN
 */
export function processRataRata(rows, qty) {
  // If rows already have name + values, process directly
  const output = [['Nama', 'Nilai Rata-Rata']];
  for (const row of rows) {
    if (!row || row.length < 2) continue;
    const name = String(row[0]).trim();
    // Abaikan jika ternyata masih terbaca sebagai header (pengaman ekstra)
    if (name.toLowerCase() === 'nama siswa' || name.toLowerCase() === 'nama') continue;

    // Take exactly `qty` rata-rata values (trim to qty if more)
    const values = row.slice(1, qty + 1).map(v => String(v).trim()).filter(v => v !== '');
    if (!name || values.length === 0) continue;

    values.forEach((val, idx) => {
      output.push([idx === 0 ? name : '', val]);
    });
  }
  return output;
}

/**
 * Download output as CSV
 */
export function downloadCSV(rows, filename) {
  const csv = rows.map(row =>
    row.map(cell => {
      const s = String(cell ?? '');
      return s.includes(',') || s.includes('"') || s.includes('\n')
        ? `"${s.replace(/"/g, '""')}"` : s;
    }).join('\t')
  ).join('\r\n');

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Download output as Excel
 */
export function downloadExcel(rows, filename) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws['!cols'] = [{ wch: 30 }, { wch: 20 }];

  // Style header (basic)
  const headerRange = XLSX.utils.decode_range(ws['!ref']);
  for (let C = headerRange.s.c; C <= headerRange.e.c; C++) {
    const addr = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!ws[addr]) continue;
    ws[addr].s = { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '1e3a5f' } } };
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Hasil');
  XLSX.writeFile(wb, filename);
}

/**
 * Download template as Excel (.xlsx) for NILAI
 * Excel is used so columns are properly separated when opened
 */
export function downloadNilaiTemplate() {
  const rows = [
    ['Nama Siswa', 'Nilai 1', 'Nilai 2', 'Nilai 3', 'Nilai 4', 'Nilai 5'],
    ['AHMAD FAUZI', 85, 90, 88, 87, 92],
    ['BUDI SANTOSO', 78, 82, 79, 80, 75],
    ['CITRA DEWI', 91, 87, 93, 89, 94],
  ];
  downloadExcelTemplate(rows, 'template_nilai.xlsx', 'Template Nilai');
}

/**
 * Download template as Excel (.xlsx) for RATA-RATA
 * Excel is used so columns are properly separated when opened
 */
export function downloadRataRataTemplate(qty = 20) {
  const header = ['Nama Siswa', ...Array.from({ length: qty }, (_, i) => `Rata-Rata ${i + 1}`)];
  const row1 = ['AHMAD FAUZI', ...Array.from({ length: qty }, () => 80 + Math.floor(Math.random() * 10))];
  const row2 = ['BUDI SANTOSO', ...Array.from({ length: qty }, () => 75 + Math.floor(Math.random() * 12))];
  const row3 = ['CITRA DEWI', ...Array.from({ length: qty }, () => 85 + Math.floor(Math.random() * 8))];
  downloadExcelTemplate([header, row1, row2, row3], 'template_rata_rata.xlsx', 'Template Rata-Rata');
}

/**
 * Internal: download a template as styled Excel file
 */
function downloadExcelTemplate(rows, filename, sheetName = 'Template') {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Auto column widths
  const maxCols = Math.max(...rows.map(r => r.length));
  ws['!cols'] = [{ wch: 28 }, ...Array.from({ length: maxCols - 1 }, () => ({ wch: 14 }))];

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
