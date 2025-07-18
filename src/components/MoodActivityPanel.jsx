import React from "react";
import './MoodActivityPanel.css';

const moods = ["Happy", "Angry", "Frustrated", "Annoyed", "Sleepy"];
const activities = ["Focus work", "Work together", "Creative", "Relax", "Microbreak", "Routine job"];

export default function MoodActivityPanel({ mood, setMood, activity, setActivity, showStart, onStart }) {
  return (
    <div className="panel-container">
      <div className="panel-group">
        <h3>Mood</h3>
        <div className="panel-buttons">
          {moods.map((m) => (
            <button
              key={m}
              className={mood === m ? "selected" : ""}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="panel-group">
        <h3>Activity</h3>
        <div className="panel-buttons">
          {activities.map((a) => (
            <button
              key={a}
              className={activity === a ? "selected" : ""}
              onClick={() => setActivity(a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      {showStart && (
        <button className="start-listening-btn" onClick={onStart}>
          Start listening
        </button>
      )}
    </div>
  );
}
