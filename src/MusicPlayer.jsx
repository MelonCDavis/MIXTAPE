import { createContext, useContext, useState, useRef, useEffect } from "react";

const MusicPlayerContext = createContext();
export const useMusicPlayer = () => useContext(MusicPlayerContext);

export function MusicPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  /* FAVORITES                                                  */
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (track) => {
    if (!track) return;
    setFavorites((prev) =>
      prev.includes(track.id)
        ? prev.filter((id) => id !== track.id)
        : [...prev, track.id]
    );
  };

  const isFavorite =
    currentTrack && favorites.includes(currentTrack.id);

  /* LOAD TRACK                                                 */
  const loadTrack = (track) => {
    if (!track || !track.preview) return;

    audioRef.current.src = track.preview;
    audioRef.current.load();
    setCurrentTrack(track);
  };

  /* PLAY / PAUSE                                               */
  const play = () => {
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  /* VOLUME                                                     */
  const setPlayerVolume = (v) => {
    setVolume(v);
    audioRef.current.volume = v;
  };

  /* SHUFFLE + REPEAT                                           */
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const toggleShuffle = () => setShuffle((s) => !s);
  const toggleRepeat = () => setRepeat((r) => !r);

  /* REWIND (cassette behavior)                                */
  const rewind = () => {
    if (!audioRef.current || !currentTrack) return;

    if (audioRef.current.currentTime > 4) {
      audioRef.current.currentTime = 0;
      return;
    }

    const index = playlist.findIndex((t) => t.id === currentTrack.id);

    if (index > 0) {
      loadTrack(playlist[index - 1]);
      play();
    } else if (playlist.length > 0) {
      loadTrack(playlist[playlist.length - 1]);
      play();
    }
  };

  const forward = () => {
    if (!playlist.length || !currentTrack) return;

    const index = playlist.findIndex((t) => t.id === currentTrack.id);

    if (shuffle) {
      const next = Math.floor(Math.random() * playlist.length);
      loadTrack(playlist[next]);
      play();
      return;
    }

    if (index < playlist.length - 1) {
      loadTrack(playlist[index + 1]);
      play();
    } else {
      loadTrack(playlist[0]);
      play();
    }
  };

  const fastScan = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(
      audio.currentTime + 2,
      audio.duration || 30
    );
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        play();
      } else {
        forward(); 
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeat, currentTrack, playlist]);

  return (
    <MusicPlayerContext.Provider
      value={{
        audioRef,

        currentTrack,
        playlist,
        setPlaylist,
        loadTrack,

        isPlaying,
        play,
        pause,

        progress,
        volume,
        setPlayerVolume,

        favorites,
        isFavorite,
        toggleFavorite,

        rewind,
        forward,
        fastScan,

        shuffle,
        toggleShuffle,

        repeat,
        toggleRepeat,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}
