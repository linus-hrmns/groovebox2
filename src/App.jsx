import { useState } from 'react'
import Jukebox3D from './components/Jukebox3D';
import AudioPlayer from './components/AudioPlayer';
import MusicControls from './components/MusicControls';
import Draggable from './components/Draggable';
import { playlists } from './utils/playlists';
import './App.css';

// Mock meta info for demo
const meta = [
  { song: "Open Source Groove", artist: "Free Artist", album: "Groovebox Sampler" },
  { song: "Creative Commons Jam", artist: "CC Band", album: "Groovebox Sampler" }
];

function App() {
  const [mood, setMood] = useState("");
  const [activity, setActivity] = useState("");
  const [playing, setPlaying] = useState(false);

  const showStart = mood && activity;
  const playlistKey = `${mood}|${activity}`;
  const playlist = playlists[playlistKey] || [
    "/src/assets/audio/happy_focus1.mp3",
    "/src/assets/audio/happy_focus2.mp3"
  ];

  const handleStart = () => setPlaying(true);
  const handleEnd = () => setPlaying(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Jukebox3D
        mood={mood}
        setMood={setMood}
        activity={activity}
        setActivity={setActivity}
        showStart={showStart && !playing}
        onStart={handleStart}
      />
      {playing && (
        <Draggable defaultPosition={{ x: window.innerWidth / 2 - 200, y: window.innerHeight - 320 }}>
          <AudioPlayer
            playlist={playlist}
            onEnd={handleEnd}
            controls={{
              render: (props) => <MusicControls {...props} />,
              meta
            }}
          />
        </Draggable>
      )}
    </div>
  );
}

export default App
