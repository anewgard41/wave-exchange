import React, { useRef, useState } from 'react';
import { Layout } from 'antd';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Header from './Header.jsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../src/styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const { Content } = Layout;
import React from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import Auth from "../utils/auth";

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_SONG } from "../utils/mutations";

const { Content } = Layout;

const UserPage = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  
  return (
    <div className="body-container">
      <Header/>
      <Layout style={layoutStyle}>
        {/* Main content area */}
        <Content style={layoutStyle}>
          {/* "Login" text */}
          <p style={{ color: '#FFFCF2', fontSize: '36px', marginBottom: '10px' }}>Saved Songs</p>
          <Swiper
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
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <SwiperSlide>Artist - Song</SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
            <span ref={progressContent}></span>
            </div>
          </Swiper>
        </Content>
      </Layout>
    </div>
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const { loading, error, data } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });


  const [removeSong] = useMutation(REMOVE_SONG);
  const userData = data?.me || {};
  console.log(userData);
  const savedMusic = userData.savedMusic || [];
  console.log(savedMusic);

  

  const handleRemoveSong = async (songId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);

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
      console.log('Song removed successfully');
    } catch (error) {
      console.error('Error removing song:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout style={{ textAlign: 'center' }}>
      <Content style={{ minHeight: 'calc(100vh - 120px)', padding: '50px' }}>
        <h1 style={{ color: '#FFFCF2', fontSize: '36px', marginBottom: '20px' }}>Saved Songs</h1>
        <Row gutter={[16, 16]}>
          {savedMusic.map((song) => (
            <Col key={song.songId}>
              <Card title={song.songTitle} style={{ height: '100%' }}>
                <p>Artists: {song.artists}</p>
                <Button onClick={() => handleRemoveSong(song.songId)} type="primary">Remove Song</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default UserPage;
