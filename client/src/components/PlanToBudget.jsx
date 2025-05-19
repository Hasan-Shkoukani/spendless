import React, { useState } from 'react';
import './PlanGenerator.css'; // Assuming styles are reused
import Markdown from "./Markdown";

const PlanToBudget = ({ onClose }) => {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState('');

  const estimateBudget = async () => {
    setLoading(true);
    setBudget('');
    try {
      const response = await fetch('http://localhost:5000/api/estimate/btp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      setBudget(data.budget);
    } catch (error) {
      setBudget('Failed to estimate budget. Try again.');
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-window">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Estimate Budget From Plan</h2>
        <div className="form-group">
          <label>Enter your plan:</label>
          <textarea
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="Paste your itinerary, shopping list, or plan details here..."
          />
        </div>
        <button onClick={estimateBudget} disabled={loading}>
          {loading ? 'Estimating...' : 'Estimate Budget'}
        </button>
        {budget && (
          <div className="plan-output">
            <h3>Estimated Budget</h3>
            <Markdown text={budget} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanToBudget;
