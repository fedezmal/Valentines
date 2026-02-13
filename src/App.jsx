import { useState } from 'react';
import './App.css';
import PuzzleGame from './PuzzleGame';
import SpotifyGift from './SpotifyGift';

// ---
// To customize:
// - Edit the landing page text and styles as you wish.
// - Add or remove sections in the 'sections' page below.
// - For each section, you can add navigation and new components.
// - All main theme styles are in App.css.
// ---

function App() {
  const [page, setPage] = useState('landing');
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  return (
    <div className="valentine-bg">
      {page === 'landing' && (
        <div className="valentine-landing">
          <h1 className="valentine-title">Happy Valentines Day Michaela!</h1>
          <p className="valentine-subtitle">Will you be my valentine?</p>
          <button className="valentine-btn" onClick={() => setPage('sections')}>
            I want to be your valentines
          </button>
        </div>
      )}
      {page === 'sections' && (
        <div className="valentine-sections">
          <h2 className="valentine-section-title">Choose a section</h2>
          <div className="valentine-section-list">
            {/* Add more sections here as you customize! */}
            <button className="valentine-section-btn" onClick={() => setPage('Brownies')}>Brownie Recipe</button>
            <button className="valentine-section-btn">Love Notes</button>
            <button className="valentine-section-btn" onClick={() => { setPuzzleSolved(false); setPage('Puzzle'); }}>Surprise 1</button>
            <button className="valentine-section-btn">More coming soon...</button>
          </div>
          <button className="valentine-back-btn" onClick={() => setPage('landing')}>
            &larr; Back
          </button>
        </div>
      )}

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
      {page === 'Brownies' && (
        <div className="valentine-recipe">
          <h2 className="valentine-recipe-title">Fudgy Crinkle-Top Brown Butter Brownies</h2>
        

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
