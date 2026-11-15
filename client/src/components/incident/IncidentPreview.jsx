import { useState } from 'react';
import ReportCounter from './ReportCounter.jsx';

const REVIEW_THRESHOLD = 0.45; // matches config.py in the AI service

// Row 4 · image src/alt from data
// Row 5 · "Needs review" chip rendered with && (derived, never stored in state)
// Row 8 · state lifted here so both ReportCounters move together
export default function IncidentPreview({ incident }) {
  const [count, setCount] = useState(0);

  function handleSeen() {
    setCount(count + 1);
  }

  const ai = incident.ai;
  const needsReview = ai ? ai.confidence < REVIEW_THRESHOLD : false;

  return (
    <section className="section" id="incident">
      <div className="container">
        <h2 className="section-title">Incident preview</h2>
        <div className="card incident">
          <img
            src={incident.image.url}
            alt={incident.description}
            width={incident.image.width}
            height={incident.image.height}
          />
          <div>
            <h3>Report #{incident._id}</h3>
            <p>{incident.description}</p>
            <div className="incident-meta">
              <span className="chip">Status: {incident.status}</span>
              {ai && (
                <span className="chip chip-primary">
                  AI confidence: {Math.round(ai.confidence * 100)}%
                </span>
              )}
              {needsReview && <span className="chip chip-warning">⚠ Needs review</span>}
            </div>
            <div className="counter-row">
              <ReportCounter count={count} onClick={handleSeen} />
              <ReportCounter count={count} onClick={handleSeen} />
            </div>
            <p className="hint">Both buttons share one count held in IncidentPreview.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
