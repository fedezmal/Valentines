import React, { useState, useEffect } from 'react';
import './PuzzleGame.css'; // Ensure you have this file or remove the import
import puzzleImage from './assets/puzzle-image.jpeg';

// CONFIGURATION
const GRID_ROWS = 6;
const GRID_COLS = 4;
const TOTAL_PIECES = GRID_ROWS * GRID_COLS;

// 1. Generate the sorted array (0 to 23)
const getSolvedArray = () => Array.from({ length: TOTAL_PIECES }, (_, i) => i);

// 2. Shuffle function
function shuffle(array) {
  const newArray = [...array];
  let currentIndex = newArray.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

export default function PuzzleGame({ onSolved }) {
  // Initialize with a SHUFFLED array
  const [pieces, setPieces] = useState(() => shuffle(getSolvedArray()));
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  // AUTOMATIC DETECTION: Check for solution every time 'pieces' changes
  useEffect(() => {
    // Check if every piece matches its index (0 is at 0, 1 is at 1...)
    const correct = pieces.every((val, index) => val === index);
    
    if (correct && !isSolved) {
      setIsSolved(true);
      // Small delay so the user sees the final piece snap in before the alert/event
      setTimeout(() => {
        onSolved();
      }, 300);
    }
  }, [pieces, isSolved, onSolved]);

  function handleDragStart(idx) {
    if (isSolved) return; // Disable dragging if already won
    setDraggedIdx(idx);
  }

  function handleDrop(targetIdx) {
    if (draggedIdx === null || draggedIdx === targetIdx || isSolved) return;
    
    const newPieces = [...pieces];
    // Swap the pieces
    [newPieces[draggedIdx], newPieces[targetIdx]] = [newPieces[targetIdx], newPieces[draggedIdx]];
    
    setPieces(newPieces);
    setDraggedIdx(null);
  }

  function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '20vh', padding: 5}}>
      <div 
        className="puzzle-container" 
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          // If solved, remove the gap to show the full image!
          gap: isSolved ? 0 : '2px', 
          
          // --- SIZE SETTINGS ---
          // This makes it fill 85-90% of the screen height
          height: '70vh',
          // Auto-calculate width based on the 4:6 aspect ratio
          aspectRatio: `${GRID_COLS}/${GRID_ROWS}`, 
          // ---------------------

          background: '#333',
          border: isSolved ? 'none' : '4px solid #ff69b4', // Remove outer border when solved
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'gap 0.5s ease, border 0.5s ease' // Smooth animation
        }}
      >
      {pieces.map((imageIndex, currentGridPosition) => {
        const imgRow = Math.floor(imageIndex / GRID_COLS);
        const imgCol = imageIndex % GRID_COLS;
        const xPos = (imgCol / (GRID_COLS - 1)) * 100;
        const yPos = (imgRow / (GRID_ROWS - 1)) * 100;

        return (
          <div
            key={currentGridPosition}
            draggable={!isSolved}
            onDragStart={() => handleDragStart(currentGridPosition)}
            onDrop={() => handleDrop(currentGridPosition)}
            onDragOver={handleDragOver}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${puzzleImage})`,
              backgroundSize: `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`,
              backgroundPosition: `${xPos}% ${yPos}%`,
              cursor: isSolved ? 'default' : 'grab',
              
              // Remove inner borders when solved for a clean look
              boxShadow: isSolved ? 'none' : 'inset 0 0 0 1px rgba(255,255,255,0.2)',
              
              opacity: draggedIdx === currentGridPosition ? 0.4 : 1,
              transition: 'all 0.3s ease',
            }}
          />
        );
      })}
      </div>
      
      {/* Optional: Win Message */}
      {isSolved && (
        <div style={{ 
            marginTop: 20, 
            fontSize: '2rem', 
            color: '#ff1493', 
            fontWeight: 'bold',
            animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          ❤️ Perfect Match! ❤️
        </div>
      )}
    </div>
  );
}