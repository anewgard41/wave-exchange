import "../css/SongList.css";
import React, { useState, useMemo } from "react";
import { Collapse, Alert } from "antd";
import { SongListPanel } from "./SongListPanel";

import { useMutation } from "@apollo/client";
import { SAVE_SONG } from "../utils/mutations";
import { useUserData } from "../components/UserStore";
import Auth from "../utils/auth";

// SongList component for displaying a list of songs with collapsible panels
export function SongList({ searchResults }) {
  // State for managing saved song information and success messages
  const [savedSongId, setSavedSongId] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSong, setActiveSong] = useState();
  const [saveSong] = useMutation(SAVE_SONG);
  const { refetch } = useUserData();

  // Event handler for changing the active song panel
  const onChange = (key) => {
    if (Array.isArray(key)) key = key[0];
    setActiveSong(key);
  };

  // Function for saving a song to the user's collection
  const handleSaveSong = async (song, setSavedMusic) => {
    // Check if the user is logged in and retrieve the token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // If user is not logged in, do nothing
    if (!token) {
      return false;
    }

    try {
      // Attempt to save the song using the SAVE_SONG mutation
      const { data } = await saveSong({
        variables: {
          input: song,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      // Log success and update saved music state
      console.log("Saved song:", data);
      setSuccessMessage("Song saved!");
      setSavedMusic(prevSavedMusic => [...prevSavedMusic, song]);
      await refetch();
    } catch (error) {
      // Log error and set error message
      console.error("Error saving song:", error);
      setSuccessMessage("Song already saved!");
    }
  };
  console.log("searchResults", searchResults);

  // Render the SongList component
  return (
    <div className="search-result-container">
      {/* Collapse component for displaying collapsible panels */}
      <Collapse className="custom-collapse" onChange={onChange} accordion>
        {/* Map through search results and render each as a panel */}
        {searchResults.map((result) => (
          <Collapse.Panel
            className="custom-collapse"
            style={{ backgroundColor: "#252422" }}
            header={
              <span>{`${result.name} - ${result.artists[0]}`}</span>
            }
            key={result.id}
          >
            {/* SongListPanel component for each song */}
            <SongListPanel
              song={result}
              handleSaveSong={handleSaveSong}
              enabled={activeSong === result.id}
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
}
