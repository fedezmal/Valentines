import React from 'react';
import './SpotifyGift.css';

export default function SpotifyGift({ onBack }) {
  return (
    <div className="spotify-gift-container">
      <h2>Congratulations! 🎉</h2>
      <p>You solved the puzzle! Here is your special Spotify playlist:</p>
      <div className="spotify-embed-wrapper">
        {/* Replace the src below with your playlist's embed link */}
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist Gift"
        ></iframe>
      </div>
      <button className="valentine-back-btn" onClick={onBack}>&larr; Back</button>
    </div>
  );
}
