import React, { Fragment } from 'react'
import { useFetchSongLyrics } from '../LyricStore';
import { Collapse, Button } from "antd";

export const SongListPanel = ({
  song,
  handleSaveSong,
  enabled
}) => {
  const lyrics = useFetchSongLyrics(enabled ? song : null);
  return (
    <Fragment>
      <pre style={{ color: "#FFFCF2" }}>
        {lyrics}
      </pre>
      <br />
      <Button
        type="primary"
        style={{ backgroundColor: "#EB5E28" }}
        onClick={() => handleSaveSong(song)}
      >
        Save Song
      </Button>
    </Fragment>
  )
}