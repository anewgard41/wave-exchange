import React from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import Auth from "../utils/auth";

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_SONG } from "../utils/mutations";

const { Content } = Layout;

const UserPage = () => {
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
  const savedMusic = userData.savedMusic ?? [];
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
