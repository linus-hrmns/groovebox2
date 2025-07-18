# Groovebox 3D Jukebox Interface

This project is a React + Vite web application featuring a 3D model of an AMI Continental 2 jukebox. Users select a "Mood" and an "Activity" using interactive 3D buttons, and the app plays a predefined playlist matching the selection.

## Features

- 3D jukebox model (Three.js)
- Interactive selection panels for Mood and Activity
- Playlist selection and audio playback

## Getting Started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

## Project Structure

- `src/components/` – React components
- `src/assets/` – 3D models and audio files
- `src/utils/` – Utility functions

## Notes

- Replace placeholder assets with your own 3D model and audio files.
- Playlists are mapped to Mood + Activity combinations in code.
