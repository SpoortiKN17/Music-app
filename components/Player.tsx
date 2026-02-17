
import React, { useState, useEffect } from 'react';
import { Song } from '../types';
import { Icons } from '../constants';
import Visualizer from './Visualizer';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isPlaying && currentSong) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <footer className="h-24 glass fixed bottom-0 left-0 right-0 z-50 px-6 flex items-center justify-between border-t border-white/10">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/3">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.title} 
          className="w-14 h-14 rounded-lg shadow-lg"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm line-clamp-1">{currentSong.title}</span>
          <span className="text-xs text-zinc-400 line-clamp-1">{currentSong.artist}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-white transition-colors"><Icons.SkipBack /></button>
          <button 
            onClick={onPlayPause}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Icons.Pause /> : <Icons.Play />}
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors" onClick={onNext}><Icons.SkipForward /></button>
        </div>
        
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-zinc-500 font-medium w-8 text-right">
            {formatTime((progress / 100) * currentSong.duration)}
          </span>
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden group relative cursor-pointer">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 group-hover:bg-blue-400" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 font-medium w-8">
            {formatTime(currentSong.duration)}
          </span>
        </div>
      </div>

      {/* Visualizer & Extra Controls */}
      <div className="flex items-center justify-end gap-6 w-1/3">
        <div className="hidden lg:block">
          <Visualizer isPlaying={isPlaying} />
        </div>
        <div className="flex items-center gap-3">
          <Icons.Volume />
          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-400 w-2/3" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Player;
