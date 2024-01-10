import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios";

const LyricStoreContext = createContext();

export const LyricStore = ({ children }) => {
  const state = useState({});
  return (
    <LyricStoreContext.Provider value={state}>
      {children}
    </LyricStoreContext.Provider>
  )
}

export const useFetchSongLyrics = (song) => {
  const [lyrics, setLyrics] = useState();
  const [lyricMap, setLyricMap] = useContext(LyricStoreContext);
  useEffect(() => {
    if (!song)
      return;
    if (lyricMap[song.id]) {
      setLyrics(lyricMap[song.id]);
      return;
    }
    axios.get(`/api/lyric?lyricId=${song.id}&lyricCheckSum=${song.checksum}`).then((res) => {
      setLyricMap((prevMap) => ({
        ...prevMap,
        [song.id]: res.data
      }))
    }, (error) => {
      console.error("Error retrieving or saving song:", error);
    })
  }, [song, lyricMap, setLyricMap]);
  return lyrics;
}