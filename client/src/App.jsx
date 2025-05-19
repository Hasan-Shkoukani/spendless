import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import PlanGenerator from './components/planGenerator';
import PlanToBudget from './components/PlanToBudget';

function App() {
  const [showPlanGenerator, setShowPlanGenerator] = useState(false);
  const [showPlanToBudget, setShowPlanToBudget] = useState(false);

  return (
    <>
      {showPlanGenerator && <PlanGenerator onClose={() => setShowPlanGenerator(false)} />}
      {showPlanToBudget && <PlanToBudget onClose={() => setShowPlanToBudget(false)} />}

      <header>
        <div className="logo">
          <img className="logo-pic" src="logo.jpg" alt="Logo" />
        </div>
      </header>

      <section className="s1">
        <div className="bg">
          <img className="bg-img" src="bg.jpeg" alt="Background" />
        </div>
        <div className="bg-text">
          <a href="#features">
            <button>
              <div>
                TRACK YOUR BUDGET
                <br />
                WITH SPENDLESS
              </div>
            </button>
          </a>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="features-header">OUR FEATURES</div>
        <div className="features">
          <div className="feature-icon" onClick={() => setShowPlanGenerator(true)}>
            <div>
              <img src="b.jpeg" alt="Budget Feature" />
            </div>
            <div className="f-text">Budget to Plan</div>
          </div>
          <div className="feature-icon" onClick={() => setShowPlanToBudget(true)}>
            <div>
              <img src="p.jpeg" alt="Plan Feature" />
            </div>
            <div className="f-text">Plan to Budget</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <a href="mailto:info@spendless.com">
            <i className="bi bi-envelope-fill"></i>
          </a>
          <a href="tel:+123456789">
            <i className="bi bi-telephone-fill"></i>
          </a>
        </div>
        <div className="footer-text">© 2025 Spendless. All rights reserved.</div>
      </footer>
    </>
  );
}

export default App;