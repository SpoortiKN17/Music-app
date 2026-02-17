
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  audioUrl?: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  imageUrl: string;
}

export interface UserState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  queue: Song[];
  history: Song[];
}

export interface GeminiRecommendation {
  reasoning: string;
  suggestedTracks: {
    title: string;
    artist: string;
    description: string;
  }[];
}
