import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const MusicPlayerContext = createContext();
export const useMusicPlayer = () => useContext(MusicPlayerContext);

export function MusicPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("mixtape_favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isFavesOpen, setIsFavesOpen] = useState(false);
  const [activeList, setActiveList] = useState("playlist");

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [favesManuallyClosed, setFavesManuallyClosed] = useState(false);

  const shuffleRef = useRef({
    playlist: { order: [], index: -1 },
    favorites: { order: [], index: -1 },
  });

  const favoritesIds = favorites.map((t) => t.id);

  const loadTrack = (track) => {
    if (!track || !track.preview) return;

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.src = track.preview;
    audio.load();

    setCurrentTrack(track);
  };

  const play = () => {
    const audio = audioRef.current;
    audio.play().catch(() => {});
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const setPlayerVolume = (v) => {
    setVolume(v);
    audioRef.current.volume = v;
  };

  const toggleShuffle = () => {
    setShuffle((prev) => {
      const next = !prev;
      if (!next) {
        shuffleRef.current = {
          playlist: { order: [], index: -1 },
          favorites: { order: [], index: -1 },
        };
      }
      return next;
    });
  };

  const toggleRepeat = () => {
    setRepeat((prev) => !prev);
  };

  const toggleFavorite = (track) => {
    if (!track) return;

    const exists = favorites.some((t) => t.id === track.id);

    if (exists) {
      const filtered = favorites.filter((t) => t.id !== track.id);

      if (activeList === "favorites") {
        if (filtered.length === 0) {
          setFavorites(filtered);
          setIsFavesOpen(false);
          setActiveList("playlist");
          if (playlist.length > 0) {
            loadTrack(playlist[0]);
            play();
          }
          return;
        }

        const idx = favorites.findIndex((t) => t.id === track.id);
        const nextIdx = idx < filtered.length ? idx : 0;
        const nextTrack = filtered[nextIdx];

        setFavorites(filtered);
        loadTrack(nextTrack);
        play();
        return;
      }

      setFavorites(filtered);
      return;
    }

    setFavorites((prev) => [...prev, track]);

    if (!isFavesOpen) {
      setFavesManuallyClosed(false);
      setIsFavesOpen(true);
    }
  };

  const isFavorite = currentTrack && favoritesIds.includes(currentTrack.id);

  useEffect(() => {
    try {
      localStorage.setItem("mixtape_favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const buildShuffleOrder = (length) => {
    const arr = Array.from({ length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const ensureShuffleState = (listName, list) => {
    const state = shuffleRef.current[listName];
    let { order, index } = state;
    const n = list.length;

    if (n === 0) return null;

    const invalidOrder =
      order.length !== n || order.some((i) => i < 0 || i >= n);

    if (invalidOrder) {
      order = buildShuffleOrder(n);
      if (currentTrack) {
        const curIdx = list.findIndex((t) => t.id === currentTrack.id);
        if (curIdx >= 0) {
          const pos = order.indexOf(curIdx);
          index = pos >= 0 ? pos : 0;
        } else {
          index = 0;
        }
      } else {
        index = 0;
      }
    } else if (index < 0) {
      if (currentTrack) {
        const curIdx = list.findIndex((t) => t.id === currentTrack.id);
        const pos = order.indexOf(curIdx);
        index = pos >= 0 ? pos : 0;
      } else {
        index = 0;
      }
    }

    shuffleRef.current[listName] = { order, index };
    return shuffleRef.current[listName];
  };

  const getNextShuffleTrack = (listName, list) => {
    const state = ensureShuffleState(listName, list);
    if (!state) return null;

    let { order, index } = state;
    if (order.length === 0) return null;

    index = (index + 1) % order.length;
    shuffleRef.current[listName] = { order, index };

    const trackIndex = order[index];
    return list[trackIndex];
  };

  const getPrevShuffleTrack = (listName, list) => {
    const state = ensureShuffleState(listName, list);
    if (!state) return null;

    let { order, index } = state;
    if (order.length === 0) return null;

    index = (index - 1 + order.length) % order.length;
    shuffleRef.current[listName] = { order, index };

    const trackIndex = order[index];
    return list[trackIndex];
  };

  const rewind = () => {
    if (!audioRef.current || !currentTrack) return;

    if (audioRef.current.currentTime > 4) {
      audioRef.current.currentTime = 0;
      return;
    }

    if (shuffle) {
      const listName = activeList === "favorites" ? "favorites" : "playlist";
      const list = listName === "favorites" ? favorites : playlist;
      if (!list.length) return;

      const prevTrack = getPrevShuffleTrack(listName, list);
      if (prevTrack) {
        loadTrack(prevTrack);
        play();
      }
      return;
    }

    if (activeList === "favorites") {
      if (!favorites.length) return;

      const idx = favorites.findIndex((t) => t.id === currentTrack.id);
      if (idx > 0) {
        loadTrack(favorites[idx - 1]);
        play();
      } else {
        loadTrack(favorites[favorites.length - 1]);
        play();
      }
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
  if (!currentTrack) return;

  if (shuffle) {
    const listName = activeList === "favorites" ? "favorites" : "playlist";
    const list = listName === "favorites" ? favorites : playlist;
    if (!list.length) return;

    const nextTrack = getNextShuffleTrack(listName, list);
    if (!nextTrack) return;

    const isFav = favoritesIds.includes(nextTrack.id);
    if (isFav && favesManuallyClosed) {
      setFavesManuallyClosed(false);
    }

    loadTrack(nextTrack);
    play();
    return;
  }

  if (activeList === "favorites") {
    if (!favorites.length) return;

    const idx = favorites.findIndex((t) => t.id === currentTrack.id);
    const nextIdx = idx < favorites.length - 1 ? idx + 1 : 0;
    const nextTrack = favorites[nextIdx];

    const isFav = favoritesIds.includes(nextTrack.id);
    if (isFav && favesManuallyClosed) {
      setFavesManuallyClosed(false);
    }

    loadTrack(nextTrack);
    play();
    return;
  }

  const index = playlist.findIndex((t) => t.id === currentTrack.id);
  const nextTrack =
    index < playlist.length - 1 ? playlist[index + 1] : playlist[0];

  if (!nextTrack) return;

  const isFav = favoritesIds.includes(nextTrack.id);
  if (isFav && favesManuallyClosed) {
    setFavesManuallyClosed(false);
  }

  loadTrack(nextTrack);
  play();
};


  const fastScan = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 0.3, audio.duration || 30);
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
        return;
      }
      forward();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, playlist, favorites, activeList, shuffle, repeat]);

  useEffect(() => {
    if (!currentTrack) return;

    const isFav = favoritesIds.includes(currentTrack.id);

    if (isFav && !isFavesOpen && !favesManuallyClosed) {
      setIsFavesOpen(true);
    }
  }, [currentTrack, favoritesIds, isFavesOpen, favesManuallyClosed]);

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
        favoritesIds,
        isFavorite,
        toggleFavorite,

        isFavesOpen,
        setIsFavesOpen,
        activeList,
        setActiveList,

        shuffle,
        toggleShuffle,
        repeat,
        toggleRepeat,

        rewind,
        forward,
        fastScan,

        favesManuallyClosed,
        setFavesManuallyClosed,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}
