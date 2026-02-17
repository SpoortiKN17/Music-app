
import React, { useState } from 'react';
import { getMusicRecommendations } from '../services/geminiService';
import { GeminiRecommendation, Song } from '../types';
import { Icons, MOCK_SONGS } from '../constants';

interface GeminiDJProps {
  onAddSong: (song: Song) => void;
}

const GeminiDJ: React.FC<GeminiDJProps> = ({ onAddSong }) => {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<GeminiRecommendation | null>(null);

  const moods = ['Energetic', 'Focused', 'Melancholy', 'Chill', 'Hype', 'Romantic'];

  const handleGetRecommendations = async (selectedMood?: string) => {
    const targetMood = selectedMood || mood;
    if (!targetMood) return;

    setIsLoading(true);
    try {
      const result = await getMusicRecommendations(targetMood);
      setRecommendation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMockTrack = (track: { title: string, artist: string }) => {
    // In a real app, we'd search a library. Here we'll generate a mock Song object based on the recommendation.
    const newSong: Song = {
      id: Math.random().toString(36).substr(2, 9),
      title: track.title,
      artist: track.artist,
      album: 'AI Discovery',
      coverUrl: `https://picsum.photos/seed/${track.title}/400/400`,
      duration: 180 + Math.random() * 120,
      genre: 'Recommended'
    };
    onAddSong(newSong);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto pb-32">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 text-blue-500 rounded-2xl mb-4 border border-blue-500/20">
          <Icons.Sparkles />
        </div>
        <h2 className="text-4xl font-bold mb-3 tracking-tight">Nova AI DJ</h2>
        <p className="text-zinc-400 text-lg">Tell me how you're feeling, and I'll mix the perfect set for you.</p>
      </header>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => handleGetRecommendations(m)}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-blue-500 hover:text-white hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {m}
          </button>
        ))}
      </div>

      <div className="relative mb-10">
        <input 
          type="text" 
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Describe your mood or activity (e.g., Coding on a rainy day in Seattle)"
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleGetRecommendations()}
        />
        <button 
          onClick={() => handleGetRecommendations()}
          disabled={isLoading}
          className="absolute right-3 top-3 bottom-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Thinking...' : 'Generate'}
        </button>
      </div>

      {recommendation && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 rounded-3xl glass border-blue-500/20">
            <h3 className="text-xl font-bold text-blue-400 mb-2">DJ's Insight</h3>
            <p className="text-zinc-300 leading-relaxed italic">"{recommendation.reasoning}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendation.suggestedTracks.map((track, i) => (
              <div 
                key={i} 
                className="group p-4 bg-zinc-900/40 hover:bg-zinc-800/60 rounded-2xl border border-white/5 transition-all flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={`https://picsum.photos/seed/${track.title}/100/100`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button 
                    onClick={() => addMockTrack(track)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <Icons.Play />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">{track.title}</h4>
                  <p className="text-sm text-zinc-400 truncate">{track.artist}</p>
                  <p className="text-[10px] text-blue-500 mt-1 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">AI Suggestion</p>
                </div>
                <button 
                  onClick={() => addMockTrack(track)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiDJ;
