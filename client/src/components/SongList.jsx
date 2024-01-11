import "../css/SongList.css"
import React, { useState, useMemo } from "react";
import { Collapse } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { SongListPanel } from "./SongListPanel";

import { useMutation } from "@apollo/client";
import { SAVE_SONG } from "../utils/mutations";
import { useUserData } from "../UserStore";
import Auth from "../utils/auth";

export function SongList({ searchResults }) {

  const [activeSong, setActiveSong] = useState();
  const [savedSongId, setSavedSongId] = useState({});
  const [saveSong] = useMutation(SAVE_SONG);
  const { refetch } = useUserData();

  const onChange = (key) => {
    if (Array.isArray(key)) key = key[0];
    setActiveSong(key);
  };

  const handleSaveSong = async (song) => {
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
      await refetch();
    } catch (error) {
      console.error("Error saving song:", error);
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
              <div className="header-with-heart">
              <span>{`${result.name} - ${result.artists[0]}`}</span>
              <HeartButton
                isSaved={savedSongId === result.id}
                onClick={() => handleSaveSong(result)}
              />
            </div>
            }
            key={result.id}
          >
            <SongListPanel song={result} handleSaveSong={handleSaveSong} enabled={activeSong === result.id} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
}

// HeartButton component
const HeartButton = ({ isSaved, onClick }) => {
  return isSaved ? (
    <HeartFilled className="heart-icon saved" onClick={onClick} />
  ) : (
    <HeartOutlined className="heart-icon" onClick={onClick} />
  );
};
