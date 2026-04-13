export default function StepIndicator({ steps, current }) {
  return (
    <div className="steps">
      {steps.map((step, idx) => {
        const isDone = idx < current;
        const isActive = idx === current;
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
              <div className="step-num">
                {isDone ? '✓' : idx + 1}
              </div>
              <div className="step-label">{step}</div>
            </div>
            {idx < steps.length - 1 && (
              <div className={`step-connector ${isDone ? 'done' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
