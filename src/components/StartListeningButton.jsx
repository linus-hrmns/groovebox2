import React from "react";
import './StartListeningButton.css';

export default function StartListeningButton({ onClick }) {
  return (
    <button className="start-listening-btn" onClick={onClick}>
      Start listening
    </button>
  );
}
