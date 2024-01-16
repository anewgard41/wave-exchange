import React, { useState, Fragment } from "react";
import { useFetchSongLyrics } from "../components/LyricStore";
import { Collapse, Button, Alert } from "antd";
import { useUserData } from "../components/UserStore";
import Auth from "../utils/auth";

// SongListPanel component for displaying song details and handling song saving
export const SongListPanel = ({
  song,
  handleSaveSong,
  enabled,
  successMessage,
}) => {
  // Fetch user data and saved music from the user's collection
  const { data: userData } = useUserData();
  console.log(song.id);

  // Log user data and retrieve saved music
  console.log("User data: ", userData);
  const [savedMusic, setSavedMusic] = useState(userData.savedMusic ?? []);

  console.log(savedMusic);

  // State for managing the visibility of the success alert
  const [alertShown, setAlertShown] = useState(false);
  // Fetch lyrics for the enabled song
  const lyrics = useFetchSongLyrics(enabled ? song : null);

  // Function to handle saving the song and display alert
  const alertStatus = () => {
    handleSaveSong(song, setSavedMusic);
    setAlertShown(true);
    setTimeout(() => {
      setAlertShown(false);
    }, 1000);
  };

  // Render the SongListPanel component
  return (
    <Fragment>
      {/* Display lyrics */}
      <pre style={{ color: "#FFFCF2" }}>{lyrics}</pre>
      <br />
      {/* Save Song button */}
      <Button
        // Disable the button if the user is logged in and the song is already saved
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

      {/* Display success or error message */}
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
