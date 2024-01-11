import React, { useRef, useState } from 'react';
import { Layout, Row, Col, Card, Button, Modal } from 'antd';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { useFetchSongLyrics } from '../LyricStore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../src/styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Auth from "../utils/auth";

import {useMutation } from "@apollo/client";
//import { GET_ME } from "../utils/queries";
import { REMOVE_SONG } from "../utils/mutations";
import { useUserData } from '../UserStore';

const { Content } = Layout;

const UserPage = () => {
  const { data: userData } = useUserData();
  const [removeSong] = useMutation(REMOVE_SONG);
  console.log('User data: ', userData);
  const [savedMusic, setSavedMusic] = useState(userData.savedMusic ?? []);
  console.log(savedMusic);

  const [activeSong, setActiveSong] = useState();
  const lyrics = useFetchSongLyrics(activeSong);

  const handleRemoveSong = async (songId) => {

    console.log(`this is the song id : ${songId}`);

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);

    if (!token) {
      return false;
    }

    try {

      const { data } = await removeSong({
        variables: { songId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log('Song removed successfully', data);

      const newSavedMusic = savedMusic.filter(song => song.id !== songId);
      setSavedMusic(newSavedMusic);
    } catch (error) {
      console.error('Error removing song:', error.message);
    }
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <Layout style={{ textAlign: 'center' }}>
      <Modal title={activeSong?.name} open={!!activeSong} onCancel={() => setActiveSong(null)} footer={[]}>
        <pre>{lyrics}</pre>
      </Modal>
      <Content style={{ minHeight: 'calc(100vh - 120px)', padding: '50px' }}>
        <h1 style={{ color: '#FFFCF2', fontSize: '36px', marginBottom: '20px' }}>Saved Songs</h1>
        {savedMusic.map((song) => (
          <Card title={
            <div onClick={() => setActiveSong(song)}>{song.name}</div>
          } style={{ height: '100%' }} key={song.id}>
            <p>Artists: {song.artists}</p>
            <Button onClick={() => handleRemoveSong(song.id)} type="primary">
              Remove Song
            </Button>
          </Card>
        ))}
        {/* <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="Swiper"
          >
          {savedMusic.map((song) => (
            <SwiperSlide key={song.songId}>
              <Card title={song.songTitle} style={{ height: '100%' }}>
                <p>Artists: {song.artists}</p>
                <Button onClick={() => handleRemoveSong(song.songId)} type="primary">
                  Remove Song
                </Button>
              </Card>
            </SwiperSlide>
          ))}
          <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper> */}
      </Content>
    </Layout>
  );
};

export default UserPage;
