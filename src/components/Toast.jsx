import { useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(onRemove, 3500);
    return () => clearTimeout(timerRef.current);
  }, [onRemove]);

  const icons = { 
    success: <CheckCircle size={18} />, 
    error: <XCircle size={18} />, 
    info: <Info size={18} /> 
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <span style={{ display: 'flex' }}>{icons[toast.type] || <Info size={18} />}</span>
      <span>{toast.message}</span>
    </div>
  );
}
