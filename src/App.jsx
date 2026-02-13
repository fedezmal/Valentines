import { useState } from 'react';
import './App.css';
import PuzzleGame from './PuzzleGame';
import SpotifyGift from './SpotifyGift';
import Wordle from './Wordle'; // 1. Import Wordle

function App() {
  const [page, setPage] = useState('landing');
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  return (
    <div className="valentine-bg">
      {/* LANDING PAGE */}
      {page === 'landing' && (
        <div className="valentine-landing">
          <h1 className="valentine-title">Happy Valentines Day Tiny Babyyyyyyyy!</h1>
          <p className="valentine-subtitle">Will you be my valentine?</p>
          <button className="valentine-btn" onClick={() => setPage('sections')}>
            I want to be your valentines
          </button>
        </div>
      )}

      {/* SECTIONS MENU */}
      {page === 'sections' && (
        <div className="valentine-sections">
          <h2 className="valentine-section-title">Choose a section</h2>
          <div className="valentine-section-list">
            <button className="valentine-section-btn" onClick={() => setPage('Brownies')}>Brownie Recipe</button>
            
            <button className="valentine-section-btn" onClick={() => { setPuzzleSolved(false); setPage('Puzzle'); }}>
              Surprise 1
            </button>
            
            {/* 2. Add Button for Wordle */}
            <button className="valentine-section-btn" onClick={() => setPage('Wordle')}>
              Surprise 2
            </button>
          </div>
          <button className="valentine-back-btn" onClick={() => setPage('landing')}>
            &larr; Back
          </button>
        </div>
      )}

      {/* --- WORDLE GAME SECTION --- */}
      {page === 'Wordle' && (
        <div className="valentine-sections" style={{width: 'auto', maxWidth: '600px'}}>
           <Wordle 
             onBack={() => setPage('sections')} 
             onGameWon={() => setPage('WordleGift')} // 3. Redirect to internal gift page
           />
        </div>
      )}

      {/* --- WORDLE GIFT (THE PRIZE) --- */}
      {page === 'WordleGift' && (
        <div className="valentine-sections">
          <h2 style={{color: '#e60073', fontFamily: 'Pacifico, cursive'}}>You got it!</h2>
          <p style={{fontSize: '1.2rem', marginBottom: '20px'}}>
            You are my <strong>TINY</strong> little valentine! 💖
          </p>
          <div style={{
            background: '#fff0f6', 
            padding: '20px', 
            borderRadius: '10px', 
            border: '2px dashed #ff69b4',
            marginBottom: '20px'
          }}>
            <p><strong>Redeem this coupon for:</strong></p>
            <h3 style={{color: '#d63384'}}>One Romantic Dinner Date 🍝</h3>
            <p style={{fontSize: '0.9rem', color: '#666'}}>(Valid anytime you want!)</p>
          </div>
          <button className="valentine-btn" onClick={() => setPage('sections')}>
            Yay! (Back to Menu)
          </button>
        </div>
      )}

      {/* --- PUZZLE SECTION --- */}
      {page === 'Puzzle' && !puzzleSolved && (
        <div>
          <h2 style={{textAlign: 'center', color: '#e60073', fontFamily: 'Pacifico, cursive'}}>Surprise Puzzle</h2>
          <PuzzleGame onSolved={() => setPuzzleSolved(true)} />
          <button className="valentine-back-btn" onClick={() => setPage('sections')}>&larr; Back</button>
        </div>
      )}
      {page === 'Puzzle' && puzzleSolved && (
        <SpotifyGift onBack={() => { setPuzzleSolved(false); setPage('sections'); }} />
      )}

      {/* --- RECIPE SECTION --- */}
      {page === 'Brownies' && (
        <div className="valentine-recipe">
          <h2 className="valentine-recipe-title">Fudgy Crinkle-Top Brown Butter Brownies</h2>
          {/* ... (Keep your existing recipe code here) ... */}
           <div className="valentine-recipe-times">
            <span>Prep: 20 min</span>
            <span>Cook: 35 min</span>
            <span>Total: 2 h 25 m</span>
          </div>
          
           <div className="valentine-recipe-section">
            <h3>Ingredients</h3>
            <ul>
              <li>1 cup (226g) salted butter</li>
              <li>1/2 cup (48g) unsweetened dutch process cocoa powder</li>
              <li>Optional: 1/2 tsp (1g) instant espresso powder</li>
              <li>6oz (170g) dark chocolate chips or chopped chocolate</li>
              <li>2 tbsp (30ml) olive oil</li>
              <li>3 eggs, at room temperature</li>
              <li>3/4 cup (165g) brown sugar</li>
              <li>3/4 cup (150g) granulated sugar</li>
              <li>2 tsp (8g) vanilla bean paste or extract</li>
              <li>1/2 cup (60g) all-purpose flour</li>
              <li>1/2 tsp (3g) salt</li>
              <li>3/4 cup (150g) chocolate chips of choice (dark and semi-sweet mixture)</li>
            </ul>
          </div>

          <div className="valentine-recipe-section">
            <h3>Instructions</h3>
            <ol>
              <li><strong>Preheat the oven and prepare the pan:</strong> Preheat to 350°F. Grease and line an 8x8" pan for thicker fudgier brownies, or 9x9" for thinner crispier ones.</li>
              <li><strong>Brown the butter:</strong> Melt butter in saucepan over medium-high heat, stirring continuously (5-8 minutes). Once it reaches deep golden amber and smells nutty, reduce heat and add cocoa powder and espresso powder. Stir quickly to combine.</li>
              <li><strong>Add chocolate:</strong> Remove from heat, let cool 1-2 minutes, then mix in chocolate chips and olive oil until smooth. Set aside to cool.</li>
              <li><strong>Prepare batter:</strong> In a large bowl, whisk eggs and both sugars until frothy (2-3 minutes). Whisk in vanilla.</li>
              <li><strong>Combine mixtures:</strong> Once chocolate mixture is cooled, add it to the egg mixture and whisk until fully incorporated.</li>
              <li><strong>Fold in dry ingredients:</strong> Fold in flour and salt, then fold in chocolate chips.</li>
              <li><strong>Pour and spread:</strong> Pour into prepared pan and spread evenly.</li>
              <li><strong>Bake:</strong> Bake at 350°F for 30-35 minutes. Top should look shiny and crinkly with edges set and slight jiggle in middle.</li>
              <li><strong>Cool:</strong> Cool on wire rack for at least 1.5-2 hours for optimal texture.</li>
              <li><strong>Slice and serve:</strong> Cut into 9-16 brownies with a hot knife for neat slices. Enjoy!</li>
            </ol>
          </div>

          <button className="valentine-back-btn" onClick={() => setPage('sections')}>
            &larr; Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;