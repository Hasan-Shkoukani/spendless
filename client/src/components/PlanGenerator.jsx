import React, { useState } from 'react';
import './PlanGenerator.css';
import Markdown from "./Markdown";

const PlanGenerator = ({ onClose }) => {
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('');

  const generatePlan = async () => {
    setLoading(true);
    setPlan('');
    try {
        const response = await fetch('http://localhost:5000/api/plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget,
          duration,
          preferences: { food: preferences },
        }),
      });

      const data = await response.json();
      setPlan(data.plan);
    } catch (error) {
      setPlan('Failed to generate plan. Try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-window">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Generate a Budget Plan</h2>
        <div className="form-group">
          <label>Budget ($)</label>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Duration (days)</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Preferences</label>
          <textarea value={preferences} onChange={(e) => setPreferences(e.target.value)} placeholder="e.g., vegetarian, no dairy, likes pasta..." />
        </div>
        <button onClick={generatePlan} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>

        {plan && (
          <div className="plan-output">
            <h3>Your Plan</h3>
            <Markdown text={plan} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanGenerator;