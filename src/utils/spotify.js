// Spotify API utility for fetching recommendations by arousal (energy) and valence
// You must set your client ID and secret below

const CLIENT_ID = 'e92dc6b0531d4437b1fe1ced0812dbd6';
const CLIENT_SECRET = '08d0322a8b564dcb98e89db7a879d3f1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECOMMENDATIONS_URL = 'https://api.spotify.com/v1/recommendations';

async function getSpotifyToken() {
  const resp = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Spotify token error: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  return data.access_token;
}

let availableGenres = null;

async function getAvailableGenres(token) {
  if (availableGenres) return availableGenres;
  const resp = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) {
    // fallback to a safe default
    return ['pop'];
  }
  const data = await resp.json();
  availableGenres = data.genres || ['pop'];
  return availableGenres;
}

export async function fetchSpotifyTracks({ arousal, valence, limit = 5 }) {
  const token = await getSpotifyToken();
  const genres = await getAvailableGenres(token);
  // Pick 2 random genres if possible, fallback to 'pop' if empty
  let pickedGenres = 'pop';
  if (Array.isArray(genres) && genres.length > 0) {
    const shuffled = genres.sort(() => 0.5 - Math.random());
    pickedGenres = shuffled.slice(0, Math.min(2, genres.length)).join(',');
  }
  const params = new URLSearchParams({
    limit: limit.toString(),
    seed_genres: pickedGenres,
    target_valence: valence.toString(),
    target_energy: arousal.toString(),
  });
  const resp = await fetch(`${RECOMMENDATIONS_URL}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Spotify recommendations error: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  // Return simplified track info
  return (data.tracks || []).map(track => ({
    url: track.preview_url,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name
  })).filter(t => t.url); // Only tracks with preview
}
