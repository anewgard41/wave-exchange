import React, { useState, useMemo } from "react";
import { Collapse } from "antd";
import axios from "axios";

import { useMutation } from "@apollo/client";
import { SAVE_SONG } from "../utils/mutations";

import Auth from "../utils/auth";

export function SongList({ searchResults }) {
  const [lyricMap, setLyricMap] = useState([]);

  const [savedSongId, setSavedSongId] = useState({});
  const [saveSong] = useMutation(SAVE_SONG);

  const onChange = async (key) => {
    if (Array.isArray(key)) key = key[0];
    if (!key || lyricMap.some((entry) => entry.id === key)) return;
    const song = searchResults.find((x) => x.LyricId === key);
    if (!song) return;

    try {
      const results = await axios.get(
        `/api/lyric?lyricId=${song.LyricId}&lyricCheckSum=${song.LyricChecksum}`
      );
      setLyricMap((prevLyricMap) => [
        ...prevLyricMap,
        { id: song.LyricId, data: results.data },
      ]);
    } catch (error) {
      console.error("Error retrieving or saving song:", error);
    }
  };

  const handleSaveSong = async (songId, songTitle, artists) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(`the token is ${token}`);

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveSong({
        variables: {
          input: {
            songId: songId,
            songTitle: songTitle,
            artists: artists,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log("Saved song:", data);
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };
  console.log(searchResults);
  return (
    <Collapse onChange={onChange} accordion>
      {searchResults.map((result) => (
        <Collapse.Panel
          key={result.LyricId}
          header={`${result.Song} - ${result.Artist}`}
        >
          <pre>
            {lyricMap.find((entry) => entry.id === result.LyricId)?.data}
          </pre>
          <button
            onClick={() =>
              handleSaveSong(result.LyricId, result.Song, result.Artist)
            }
          >
            Save Song
          </button>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}
