import { ClipboardList } from 'lucide-react';

export default function DataTable({ rows, maxRows = 50, emptyMessage = 'Belum ada data' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="table-empty">
        <div className="table-empty-icon"><ClipboardList size={32} /></div>
        <div>{emptyMessage}</div>
      </div>
    );
  }

  const [header, ...body] = rows;
  const displayBody = body.slice(0, maxRows);
  const hidden = body.length - displayBody.length;

  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="row-number">#</th>
              {header.map((h, i) => (
                <th key={i}>{String(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayBody.map((row, rIdx) => (
              <tr key={rIdx}>
                <td className="row-number">{rIdx + 1}</td>
                {header.map((_, cIdx) => (
                  <td key={cIdx} className={cIdx === 0 ? 'col-name' : ''}>
                    {String(row[cIdx] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hidden > 0 && (
        <p className="helper-text" style={{ marginTop: 8, textAlign: 'center' }}>
          + {hidden} baris lainnya tidak ditampilkan
        </p>
      )}
    </div>
  );
}
