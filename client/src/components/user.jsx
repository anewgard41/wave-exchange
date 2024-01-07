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

// Styling for the layout
const layoutStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#252422',
};

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
  );
};

export default UserPage;
