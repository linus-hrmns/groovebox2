import React from "react";
import './MusicControls.css';

export default function MusicControls({
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrev,
  volume,
  setVolume,
  song,
  artist,
  album
}) {
  return (
    <div className="music-controls-container">
      <div className="music-info">
        <div className="song-title">{song || "Unknown Song"}</div>
        <div className="song-meta">{artist || "Unknown Artist"} &ndash; {album || "Unknown Album"}</div>
      </div>
      <div className="controls-row">
        <button onClick={onPrev} title="Previous">⏮️</button>
        {isPlaying ? (
          <button onClick={onPause} title="Pause">⏸️</button>
        ) : (
          <button onClick={onPlay} title="Play">▶️</button>
        )}
        <button onClick={onStop} title="Stop">⏹️</button>
        <button onClick={onNext} title="Next">⏭️</button>
      </div>
      <div className="volume-row">
        <label>🔊</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
