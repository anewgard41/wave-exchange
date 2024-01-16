import React, { useState, Fragment } from "react";
import { useFetchSongLyrics } from "../components/LyricStore";
import { Collapse, Button, Alert } from "antd";
import { useUserData } from "../components/UserStore";
import Auth from "../utils/auth";

export const SongListPanel = ({
  song,
  handleSaveSong,
  enabled,
  successMessage,
}) => {
  const { data: userData } = useUserData();
  console.log(song.id);
  // Log user data and retrieve saved music
  console.log("User data: ", userData);
  const [savedMusic, setSavedMusic] = useState(userData.savedMusic ?? []);

  console.log(savedMusic);

  const [alertShown, setAlertShown] = useState(false);
  const lyrics = useFetchSongLyrics(enabled ? song : null);

  const alertStatus = () => {
    handleSaveSong(song, setSavedMusic);
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
        disabled={
          Auth.loggedIn() &&
          savedMusic?.some((savedMusic) => savedMusic.id === song.id)
        }
        type="primary"
        style={{ backgroundColor: "#EB5E28" }}
        onClick={() => alertStatus()}
      >
        {Auth.loggedIn()
          ? savedMusic?.some((savedMusic) => savedMusic.id === song.id)
            ? "Song already saved"
            : "Save Song"
          : "Log in to save song!"}
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
