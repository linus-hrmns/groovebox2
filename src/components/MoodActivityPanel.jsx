import React from "react";
import './MoodActivityPanel.css';

// Moods and activities now include arousal and valence values
const moods = [
  { label: "Angstig", arousal: 0.9, valence: -0.5 },
  { label: "Gespannen", arousal: 0.8, valence: -0.3 },
  { label: "Gefrustreerd", arousal: 0.7, valence: -0.5 },
  { label: "Opgewonden", arousal: 0.9, valence: 0.3 },
  { label: "Verheugd", arousal: 0.6, valence: 0.7 },
  { label: "Gelukkig", arousal: 0.2, valence: 0.8 },
  { label: "Verdrietig", arousal: -0.5, valence: -0.6 },
  { label: "Verveeld", arousal: -0.7, valence: -0.4 },
  { label: "Moe", arousal: -0.9, valence: -0.1 },
  { label: "Tevreden", arousal: 0.4, valence: 0.8 },
  { label: "Ontspannen", arousal: -0.3, valence: 0.6 },
  { label: "Slaperig", arousal: -0.9, valence: 0.1 },
];
const activities = [
  { label: "Focuswerk", arousal: 0.6, valence: 0.7 },
  { label: "Routine klus", arousal: 0.4, valence: 0.6 },
  { label: "Creatief werk", arousal: 0.7, valence: 0.8 },
  { label: "Korte Deadline", arousal: 0.9, valence: 0.5 },
  { label: "Samenwerken", arousal: 0.7, valence: 0.9 },
  { label: "Korte Pauze", arousal: 0.3, valence: 0.8 },
  { label: "Langere Pauze", arousal: 0.2, valence: 0.9 },
];

export default function MoodActivityPanel({ mood, setMood, activity, setActivity, showStart, onStart }) {
  // This panel should be conditionally rendered by the parent.
  // When "Start listening" is pressed, parent should hide this and show MusicControls instead.
  return (
    <div className="panel-container">
      <div className="panel-group">
        <h3>Mood</h3>
        <div className="panel-buttons">
          {moods.map((m) => (
            <button
              key={m.label}
              className={mood && mood.label === m.label ? "selected" : ""}
              onClick={() => setMood(m)}
              title={`Arousal: ${m.arousal}, Valence: ${m.valence}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="panel-group">
        <h3>Activity</h3>
        <div className="panel-buttons">
          {activities.map((a) => (
            <button
              key={a.label}
              className={activity && activity.label === a.label ? "selected" : ""}
              onClick={() => setActivity(a)}
              title={`Arousal: ${a.arousal}, Valence: ${a.valence}`}
            >
              {a.label}
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
