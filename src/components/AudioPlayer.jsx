import React, { useRef, useState, useEffect } from "react";
import './AudioPlayer.css';

export default function AudioPlayer({ playlist, onEnd, controls }) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef();

  useEffect(() => {
    setCurrent(0);
    setIsPlaying(true);
  }, [playlist]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleEnded = () => {
    if (current < playlist.length - 1) {
      setCurrent(current + 1);
    } else if (onEnd) {
      onEnd();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current && audioRef.current.play();
  };
  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current && audioRef.current.pause();
  };
  const handleStop = () => {
    setIsPlaying(false);
    audioRef.current && audioRef.current.pause();
    audioRef.current && (audioRef.current.currentTime = 0);
  };
  const handleNext = () => {
    if (current < playlist.length - 1) {
      setCurrent(current + 1);
      setIsPlaying(true);
    }
  };
  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, current]);

  if (!playlist || playlist.length === 0) return null;

  // Show playlist UI
  return (
    <div className="audio-player-overlay">
      <audio
        ref={audioRef}
        src={playlist[current].url}
        autoPlay={isPlaying}
        onEnded={handleEnded}
        style={{ display: "none" }}
      />
      {controls &&
        controls.render({
          isPlaying,
          onPlay: handlePlay,
          onPause: handlePause,
          onStop: handleStop,
          onNext: handleNext,
          onPrev: handlePrev,
          volume,
          setVolume,
          ...playlist[current],
        })}
      <div className="playlist-ui">
        <h4>Playlist</h4>
        <ol>
          {playlist.map((song, idx) => (
            <li
              key={song.url}
              style={{
                fontWeight: idx === current ? "bold" : "normal",
              }}
            >
              {song.title}{" "}
              <span style={{ color: "#888" }}>({song.artist})</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
