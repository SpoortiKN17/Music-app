
import React from 'react';
import { Song, Playlist } from './types';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Lumina',
    album: 'Pulse of Night',
    coverUrl: 'https://picsum.photos/seed/music1/400/400',
    duration: 195,
    genre: 'Synthwave'
  },
  {
    id: '2',
    title: 'Shadow Weaver',
    artist: 'Echo Flow',
    album: 'Deep Tides',
    coverUrl: 'https://picsum.photos/seed/music2/400/400',
    duration: 212,
    genre: 'Ambient'
  },
  {
    id: '3',
    title: 'Solar Flare',
    artist: 'Nova Spark',
    album: 'Cosmic Rays',
    coverUrl: 'https://picsum.photos/seed/music3/400/400',
    duration: 180,
    genre: 'Electronic'
  },
  {
    id: '4',
    title: 'Urban Jungle',
    artist: 'Vibe King',
    album: 'City Lights',
    coverUrl: 'https://picsum.photos/seed/music4/400/400',
    duration: 245,
    genre: 'Hip-Hop'
  },
  {
    id: '5',
    title: 'Velvet Rain',
    artist: 'Serene Voices',
    album: 'Quiet Moments',
    coverUrl: 'https://picsum.photos/seed/music5/400/400',
    duration: 302,
    genre: 'Soul'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Top Hits 2024',
    description: 'The absolute best tracks of the year.',
    imageUrl: 'https://picsum.photos/seed/p1/400/400',
    songs: MOCK_SONGS.slice(0, 3)
  },
  {
    id: 'p2',
    name: 'Deep Focus',
    description: 'Concentrate with these lo-fi beats.',
    imageUrl: 'https://picsum.photos/seed/p2/400/400',
    songs: MOCK_SONGS.slice(3, 5)
  }
];

export const Icons = {
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M8 5v14l11-7z"/></svg>,
  Pause: () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  SkipBack: () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>,
  SkipForward: () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>,
  Volume: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Library: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
};
