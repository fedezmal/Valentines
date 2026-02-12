import { useState } from 'react';
import './App.css';

// ---
// To customize:
// - Edit the landing page text and styles as you wish.
// - Add or remove sections in the 'sections' page below.
// - For each section, you can add navigation and new components.
// - All main theme styles are in App.css.
// ---

function App() {
  const [page, setPage] = useState('landing');

  return (
    <div className="valentine-bg">
      {page === 'landing' && (
        <div className="valentine-landing">
          <h1 className="valentine-title">Happy Valentines Day Michaela!</h1>
          <p className="valentine-subtitle">You are loved and appreciated 💖</p>
          <button className="valentine-btn" onClick={() => setPage('sections')}>
            Enter your surprise
          </button>
        </div>
      )}
      {page === 'sections' && (
        <div className="valentine-sections">
          <h2 className="valentine-section-title">Choose a section</h2>
          <div className="valentine-section-list">
            {/* Add more sections here as you customize! */}
            <button className="valentine-section-btn" onClick={() => setPage('Memories')}>Memories</button>
            <button className="valentine-section-btn">Love Notes</button>
            <button className="valentine-section-btn">Gallery</button>
            <button className="valentine-section-btn">More coming soon...</button>
          </div>
          <button className="valentine-back-btn" onClick={() => setPage('landing')}>
            &larr; Back
          </button>
        </div>
      )}
      {page === 'memories' && (
        <div className="valentine-sections">
          <h2 className="valentine-section-title">Memories</h2>
        </div>
      )}
    </div>
  );
}

export default App;
