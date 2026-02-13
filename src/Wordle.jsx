import React, { useState, useEffect } from 'react';
import './Wordle.css';

const SOLUTION = "TINY";
const WORD_LENGTH = 4;
const MAX_GUESSES = 6;

export default function Wordle({ onBack, onGameWon }) {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [message, setMessage] = useState('');

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyup = (e) => {
      if (gameStatus !== 'playing') return;
      const key = e.key;
      
      if (key === 'Enter') handleEnter();
      else if (key === 'Backspace') handleBackspace();
      else if (/^[a-zA-Z]$/.test(key)) handleInput(key.toUpperCase());
    };

    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [currentGuess, gameStatus]);

  const handleInput = (letter) => {
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
    setMessage('');
  };

  const handleEnter = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage("Too short!");
      return;
    }
    
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === SOLUTION) {
      setGameStatus('won');
      setMessage('Correct! 🎉');
      // Wait 1.5 seconds before redirecting to the gift
      setTimeout(() => {
        onGameWon(); 
      }, 1500);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameStatus('lost');
      setMessage(`Game Over! The word was ${SOLUTION}`);
    }
  };

  // Helper to render tiles logic
  const renderRow = (guess, isCurrent) => {
    const tiles = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
      let char = '';
      let className = 'wordle-tile';

      if (guess) {
        char = guess[i];
        if (char === SOLUTION[i]) {
          className += ' correct';
        } else if (SOLUTION.includes(char)) {
          className += ' present';
        } else {
          className += ' absent';
        }
      } else if (isCurrent && currentGuess[i]) {
        char = currentGuess[i];
      }

      tiles.push(<div key={i} className={className}>{char}</div>);
    }
    return tiles;
  };

  return (
    <div className="wordle-container">
      <h2 style={{color: '#e60073', fontFamily: 'Pacifico, cursive', margin: 0}}>Guess the Word</h2>
      <p style={{marginBottom: 20}}>Hint: Describes you perfectly 😉</p>
      
      <div className="wordle-grid">
        {guesses.map((g, i) => (
          <div key={i} className="wordle-row">{renderRow(g, false)}</div>
        ))}
        {guesses.length < MAX_GUESSES && (
          <div className="wordle-row">{renderRow(null, true)}</div>
        )}
        {Array.from({ length: Math.max(0, MAX_GUESSES - 1 - guesses.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="wordle-row">
            {Array.from({ length: WORD_LENGTH }).map((_, j) => (
              <div key={j} className="wordle-tile"></div>
            ))}
          </div>
        ))}
      </div>

      <div className="wordle-message">{message}</div>

      {/* On-screen Keyboard for Mobile */}
      {gameStatus === 'playing' && (
        <div className="keyboard">
          <div className="key-row">
            {'QWERTYUIOP'.split('').map(char => (
              <button key={char} className="key-btn" onClick={() => handleInput(char)}>{char}</button>
            ))}
          </div>
          <div className="key-row">
            {'ASDFGHJKL'.split('').map(char => (
              <button key={char} className="key-btn" onClick={() => handleInput(char)}>{char}</button>
            ))}
          </div>
          <div className="key-row">
            <button className="key-btn big" onClick={handleEnter}>ENTER</button>
            {'ZXCVBNM'.split('').map(char => (
              <button key={char} className="key-btn" onClick={() => handleInput(char)}>{char}</button>
            ))}
            <button className="key-btn big" onClick={handleBackspace}>⌫</button>
          </div>
        </div>
      )}

      <button className="valentine-back-btn" onClick={onBack} style={{marginTop: 20}}>
        &larr; Give Up / Back
      </button>
    </div>
  );
}