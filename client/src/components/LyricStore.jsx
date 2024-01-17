import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create a context for managing lyric-related state
const LyricStoreContext = createContext();

// LyricStore component for providing a context to manage lyric-related state
export const LyricStore = ({ children }) => {
  // Initialize state using the useState hook
  const state = useState({});
  
  // Provide the LyricStoreContext to its children
  return (
    <LyricStoreContext.Provider value={state}>
      {children}
    </LyricStoreContext.Provider>
  );
};

// Custom hook for fetching song lyrics and managing state
export const useFetchSongLyrics = (song) => {
  // Destructure values from the LyricStoreContext
  const [lyrics, setLyrics] = useState();
  const [lyricMap, setLyricMap] = useContext(LyricStoreContext);

  // Effect hook to fetch song lyrics and manage state changes
  useEffect(() => {
    // If no song is provided, do nothing
    if (!song) return;

    // Check if the lyrics are already in the lyricMap
    if (lyricMap[song.id]) {
      setLyrics(lyricMap[song.id]);
      return;
    }

    // Fetch lyrics from the server and update the lyricMap
    axios.get(`/api/lyric?lyricId=${song.id}&lyricCheckSum=${song.checksum}`)
      .then((res) => {
        setLyricMap((prevMap) => ({
          ...prevMap,
          [song.id]: res.data,
        }));
      })
      .catch((error) => {
        console.error("Error retrieving or saving song:", error);
      });
  }, [song, lyricMap, setLyricMap]);

  // Return the fetched lyrics
  return lyrics;
};
