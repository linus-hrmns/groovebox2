import { useState } from 'react'
import Jukebox3D from './components/Jukebox3D';
import AudioPlayer from './components/AudioPlayer';
import MusicControls from './components/MusicControls';
import Draggable from './components/Draggable';
import { playlists } from './utils/playlists';
import './App.css';
import MoodActivityPanel from './components/MoodActivityPanel';

import { fetchSpotifyTracks } from './utils/spotify';

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

// Mock meta info for demo
const meta = [
  { song: "Open Source Groove", artist: "Free Artist", album: "Groovebox Sampler" },
  { song: "Creative Commons Jam", artist: "CC Band", album: "Groovebox Sampler" }
];

function App() {
  const [mood, setMood] = useState(null); // now stores mood object
  const [activity, setActivity] = useState(null); // now stores activity object
  const [playing, setPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [loadingSpotify, setLoadingSpotify] = useState(false);
  const [spotifyDebug, setSpotifyDebug] = useState(null);

  const showStart = mood && activity;

  const handleStart = async () => {
    setPlaying(true);
    setIsListening(true);
    if (mood && activity) {
      setLoadingSpotify(true);
      try {
        const tracks = await fetchSpotifyTracks({
          arousal: mood.arousal,
          valence: mood.valence,
          limit: 5
        });
        setSpotifyDebug(tracks);
        if (tracks.length > 0) {
          setPlaylist(tracks);
        } else {
          setPlaylist([]); // No fallback to demo songs
        }
      } catch (e) {
        setSpotifyDebug({ error: e.message });
        setPlaylist([]); // No fallback to demo songs
      } finally {
        setLoadingSpotify(false);
      }
    }
  }
  const handleEnd = () => setPlaying(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Display selected arousal and valence values for testing */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        background: 'rgba(0,0,0,0.7)',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
        zIndex: 1000,
        fontSize: '1rem',
        minWidth: '220px',
        textAlign: 'left',
      }}>
        <div><strong>Mood:</strong> {mood ? mood.label : '—'}</div>
        <div><strong>Arousal:</strong> {mood ? mood.arousal : '—'}</div>
        <div><strong>Valence:</strong> {mood ? mood.valence : '—'}</div>
        <div style={{ marginTop: 8 }}><strong>Activity:</strong> {activity ? activity.label : '—'}</div>
        <div><strong>Arousal:</strong> {activity ? activity.arousal : '—'}</div>
        <div><strong>Valence:</strong> {activity ? activity.valence : '—'}</div>
      </div>
      <Jukebox3D
        mood={mood}
        setMood={setMood}
        activity={activity}
        setActivity={setActivity}
        showStart={showStart && !playing}
        onStart={handleStart}
        moods={moods}
        activities={activities}
      />
      {loadingSpotify && (
        <div style={{position:'absolute',top:80,left:16,background:'#222',color:'#fff',padding:'10px 18px',borderRadius:8,zIndex:2000}}>
          Fetching Spotify tracks...
        </div>
      )}
      {!isListening ? (
        <MoodActivityPanel
          mood={mood}
          setMood={setMood}
          activity={activity}
          setActivity={setActivity}
          showStart={!!(mood && activity)}
          onStart={handleStart}
        />
      ) : (
        playing && playlist.length > 0 && (
          <Draggable defaultPosition={{ x: window.innerWidth / 2 - 200, y: window.innerHeight - 320 }}>
            <AudioPlayer
              playlist={playlist}
              onEnd={handleEnd}
              controls={{
                render: (props) => <MusicControls {...props} />,
                meta
              }}
              mood={mood}
              activity={activity}
            />
          </Draggable>
        )
      )}
      {/* Developer feedback: Spotify API debug info */}
      {spotifyDebug && (
        <div style={{
          position: 'absolute',
          left: 16,
          bottom: 16,
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          padding: '14px 20px',
          borderRadius: '8px',
          zIndex: 1000,
          fontSize: '0.95rem',
          minWidth: '320px',
          maxWidth: '420px',
          maxHeight: '40vh',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
        }}>
          <div style={{fontWeight:'bold',marginBottom:6}}>Spotify API Debug</div>
          <pre style={{margin:0, fontSize:'0.92rem'}}>{JSON.stringify(spotifyDebug, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App
