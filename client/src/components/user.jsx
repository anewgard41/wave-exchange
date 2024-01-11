import React, { useRef, useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { useFetchSongLyrics } from '../LyricStore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../src/styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Auth from "../utils/auth";

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_SONG } from "../utils/mutations";
import { useUserData } from '../UserStore';

// Shared style object
const commonStyle = {
  color: '#FFFCF2',
  fontSize: '36px',
  marginBottom: '20px',
};

const UserPage = () => {
  // Fetch user data using a custom hook
  const { data: userData } = useUserData();

  // Initialize Apollo mutation for removing a song
  const [removeSong] = useMutation(REMOVE_SONG);

  // Log user data and retrieve saved music
  console.log('User data: ', userData);
  const savedMusic = userData.savedMusic ?? [];
  console.log(savedMusic);

  // State for the currently active song and lyrics
  const [activeSong, setActiveSong] = useState();
  const lyrics = useFetchSongLyrics(activeSong);

  // Function to handle removing a song
  const handleRemoveSong = async (songId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);

    // Return if no token is available
    if (!token) {
      return false;
    }

    try {
      await removeSong({
        variables: { songId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log('Song removed successfully', data);
    } catch (error) {
      console.error('Error removing song:', error.message);
    }
  };

  // Refs for progress circle and content (not currently used)
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  // Render the UserPage component
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Modal for displaying song lyrics */}
      <Modal title={activeSong?.name} open={!!activeSong} onCancel={() => setActiveSong(null)} footer={[]}>
        <pre>{lyrics}</pre>
      </Modal>

      {/* Main content area */}
      <div style={{ minHeight: 'calc(100vh - 120px)', padding: '50px' }}>
        {/* Header */}
        <h1 style={commonStyle}>Saved Songs</h1>

        {/* Map through savedMusic array and display each song */}
        {savedMusic.map((song) => (
          <div key={song.id} style={{ backgroundColor: '#252422', marginBottom: '20px', padding: '20px', borderRadius: '20px' }}>
            {/* Display song name, make it clickable to set as active */}
            <div onClick={() => setActiveSong(song)} style={{ fontSize: '20px', cursor: 'pointer', color: '#28B5EB' }}>
              {song.name}
            </div>

            {/* Display artists with custom font color */}
            <p style={{ color: '#CCC5B9' }}>Artists: {song.artists}</p>

            {/* Button to remove the song */}
            <Button onClick={() => handleRemoveSong(song.id)} type="primary">
              Remove Song
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
