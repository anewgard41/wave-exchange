import React, { Fragment } from 'react'
import { useFetchSongLyrics } from '../LyricStore';
import { Collapse, Button, Alert } from "antd";

export const SongListPanel = ({
  song,
  handleSaveSong,
  enabled,
  successMessage,
  setSuccessMessage
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
      <div
          className="success-message"
          style={{ color: "red", fontSize: "18px", marginTop: "2px" }}
        >
          {successMessage && (
            <Alert
              message=""
              description={successMessage}
              type="warning"
              showIcon
              closable
            />
          )}
        </div>
    </Fragment>
  )
}