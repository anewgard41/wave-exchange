import React, { useState, Fragment } from "react";
import { useFetchSongLyrics } from "../LyricStore";
import { Collapse, Button, Alert } from "antd";

export const SongListPanel = ({
  song,
  handleSaveSong,
  enabled,
  successMessage,
  setSuccessMessage,
}) => {
  const [alertShown, setAlertShown] = useState(false);
  const lyrics = useFetchSongLyrics(enabled ? song : null);

  const alertStatus = () => {
    handleSaveSong(song);
    setAlertShown(true);
    setTimeout(() => {
      setAlertShown(false);
    }, 1000);
  };

  return (
    <Fragment>
      <pre style={{ color: "#FFFCF2" }}>{lyrics}</pre>
      <br />
      <Button
        type="primary"
        style={{ backgroundColor: "#EB5E28" }}
        onClick={() => alertStatus()}
      >
        Save Song
      </Button>
      <div
        className="success-message"
        style={
          successMessage === "Song saved!"
            ? { color: "green" }
            : { color: "red" }
        }
      >
        {successMessage && alertShown ? (
          <Alert
            message=""
            description={successMessage}
            type={successMessage === "Song saved!" ? "success" : "error"}
            showIcon
            closable
          />
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
};
