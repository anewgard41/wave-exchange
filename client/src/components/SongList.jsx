import React, { useState, useMemo } from "react";
import { Collapse } from "antd";
import axios from 'axios';

export function SongList({
  searchResults
}) {
  const [lyricMap, setLyricMap] = useState({});
  const onChange = async (key) => {
    if (Array.isArray(key))
      key = key[0];
    if (!key || lyricMap[key])
      return;
    const song = searchResults.find(x => x.LyricId === key);
    if (!song)
      return;
    const results = await axios.get(`/api/lyric?lyricId=${song.LyricId}&lyricCheckSum=${song.LyricChecksum}`);
    setLyricMap({
      ...lyricMap,
      [song.LyricId]: results.data
    });
  }
  return (
    <Collapse onChange={onChange} accordion>
      {searchResults.map((result) => (
        <Collapse.Panel key={result.LyricId} header={`${result.Song} - ${result.Artist}`}>
          <pre>{lyricMap[result.LyricId]}</pre>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

