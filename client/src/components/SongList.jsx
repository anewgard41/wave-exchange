import "../css/SongList.css";
import React, { useState, useMemo } from "react";
import { Collapse, Alert } from "antd";
import { SongListPanel } from "./SongListPanel";

import { useMutation } from "@apollo/client";
import { SAVE_SONG } from "../utils/mutations";
import { useUserData } from "../components/UserStore";
import Auth from "../utils/auth";

export function SongList({ searchResults }) {
  const [savedSongId, setSavedSongId] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSong, setActiveSong] = useState();
  const [saveSong] = useMutation(SAVE_SONG);
  const { refetch } = useUserData();

  const onChange = (key) => {
    if (Array.isArray(key)) key = key[0];
    setActiveSong(key);
  };

  const handleSaveSong = async (song, setSavedMusic) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(`the token is ${token}`);

    if (!token) {
      return false;
    }
    try {
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
      console.log("Saved song:", data);
      setSuccessMessage("Song saved!");
      
      setSavedMusic(prevSavedMusic => [...prevSavedMusic, song]);
      await refetch();
    } catch (error) {
      console.error("Error saving song:", error);
      setSuccessMessage("Song already saved!");
    }
  };
  console.log("searchResults", searchResults);

  return (
    <div className="search-result-container">
      <Collapse className="custom-collapse" onChange={onChange} accordion>
        {searchResults.map((result) => (
          <Collapse.Panel
            className="custom-collapse"
            style={{ backgroundColor: "#252422" }}
            header={
              <span>{`${result.name} - ${result.artists[0]}`}</span>
            }
            key={result.id}
          >
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
