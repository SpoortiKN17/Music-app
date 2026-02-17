
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import GeminiDJ from './components/GeminiDJ';
import { Song } from './types';
import { MOCK_SONGS, MOCK_PLAYLISTS, Icons } from './constants';
import { searchTrendingMusic } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(MOCK_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>(MOCK_SONGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const results = await searchTrendingMusic(searchQuery);
      setSearchResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const renderHome = () => (
    <div className="p-8 space-y-12 h-full overflow-y-auto pb-32">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Good evening</h2>
          <div className="flex gap-2">
             <button className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></button>
             <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-zinc-800 overflow-hidden">
               <img src="https://picsum.photos/seed/user/100/100" alt="user" />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_PLAYLISTS.map((playlist) => (
            <div 
              key={playlist.id} 
              className="flex items-center gap-4 bg-zinc-900/40 hover:bg-zinc-800/60 transition-all rounded-lg overflow-hidden group cursor-pointer border border-white/5"
            >
              <img src={playlist.imageUrl} alt={playlist.name} className="w-20 h-20 object-cover" />
              <span className="font-bold flex-1">{playlist.name}</span>
              <button className="mr-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl shadow-blue-500/20">
                <Icons.Play />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-6">Made For You</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_SONGS.map((song) => (
            <div 
              key={song.id} 
              onClick={() => handlePlaySong(song)}
              className="group bg-zinc-900/40 hover:bg-zinc-800/60 p-4 rounded-2xl transition-all cursor-pointer border border-white/5"
            >
              <div className="relative aspect-square mb-4 rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={song.coverUrl} 
                  alt={song.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Icons.Play />
                  </div>
                </div>
              </div>
              <h4 className="font-bold truncate mb-1">{song.title}</h4>
              <p className="text-xs text-zinc-400 truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderSearch = () => (
    <div className="p-8 h-full overflow-y-auto pb-32">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-4xl font-bold mb-6">Discovery</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search artists, songs, or trending topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 transition-all pl-14"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
            <Icons.Search />
          </div>
          {isSearching && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      </div>

      {searchResults ? (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-8 rounded-3xl glass border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
               <Icons.Sparkles /> <span>AI INSIGHTS</span>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {searchResults.text}
            </div>
            {searchResults.sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">References</h5>
                <div className="flex flex-wrap gap-3">
                  {searchResults.sources.map((source: any, i: number) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium transition-colors border border-white/5"
                    >
                      {source.title || 'Source'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Pop', 'Hip Hop', 'Jazz', 'Electronic', 'Classical', 'Rock', 'Focus', 'Sleep'].map((genre) => (
             <div 
              key={genre}
              className="aspect-video relative rounded-2xl overflow-hidden cursor-pointer group"
             >
               <img src={`https://picsum.photos/seed/${genre}/400/225`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                 <h3 className="text-xl font-bold">{genre}</h3>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 selection:bg-blue-600/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        
        <div className="flex-1 overflow-hidden z-10">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'search' && renderSearch()}
          {activeTab === 'library' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Your Library</h2>
              <div className="text-zinc-500 text-center py-20">
                <Icons.Library />
                <p className="mt-4">Save songs and playlists to see them here.</p>
              </div>
            </div>
          )}
          {activeTab === 'dj' && <GeminiDJ onAddSong={handlePlaySong} />}
        </div>
      </main>

      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => {
          const idx = MOCK_SONGS.findIndex(s => s.id === currentSong?.id);
          const next = MOCK_SONGS[(idx + 1) % MOCK_SONGS.length];
          setCurrentSong(next);
        }}
        onPrev={() => {
          const idx = MOCK_SONGS.findIndex(s => s.id === currentSong?.id);
          const prev = MOCK_SONGS[(idx - 1 + MOCK_SONGS.length) % MOCK_SONGS.length];
          setCurrentSong(prev);
        }}
      />
    </div>
  );
};

export default App;
