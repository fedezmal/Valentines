import React from 'react';
import './SpotifyGift.css';

export default function SpotifyGift({ onBack }) {
  return (
    <div className="spotify-gift-container">
      <h2>Congratulations! 🎉</h2>
      <p>You solved the puzzle! Here is your special Spotify playlist:</p>
      <div className="spotify-embed-wrapper">
        
        <iframe 
          style={{ borderRadius: '12px' }} 
          src="https://open.spotify.com/embed/playlist/1HePFLSZdPyGlZPBQRCGkg?utm_source=generator" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          title="Spotify Playlist"
        ></iframe>

      </div>
      <button className="valentine-back-btn" onClick={onBack}>← Back</button>
    </div>
  );
}