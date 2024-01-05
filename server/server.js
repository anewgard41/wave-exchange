const express = require("express");
const path = require("path");
const { xml2js } = require('xml-js');
const db = require("./config/connection");
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require("@apollo/server/express4");
require('dotenv').config();
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = async () => {
  await server.start();
  const app = express();

  server.applyMiddleware({ app });

  app.use("/graphql", expressMiddleware(server, {
    context: authMiddleware
  }))

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  };

  // Handle requests for the root path
  app.get('/', (req, res) => {
    res.send('Hello, this is your GraphQL server!');
  });

  app.get('/api/search', async (req, res) => {
    const response = await fetch(`http://api.chartlyrics.com/apiv1.asmx/SearchLyricText?lyricText=${encodeURIComponent(req.query.lyricText)}`);
    const xml = await response.text();
    try {
      const data = xml2js(xml, { compact: true });
      const results = data.ArrayOfSearchLyricResult.SearchLyricResult.map(result => {
        const newObj = {};
        Object.keys(result).forEach(key => {
          newObj[key] = result[key]._text;
        });
        return newObj;
      });
      res.status(200).json(results);
    }
    catch (error) {
      res.status(500).send(JSON.parse(error))
    }
  });
  app.get('/api/lyric', async (req, res) => {
    if (!req.query.lyricId || !req.query.lyricCheckSum) {
      res.status(400).send('Missing query parameter')
      return;
    }
    
    const response = await fetch(`http://api.chartlyrics.com/apiv1.asmx/GetLyric?lyricId=${req.query.lyricId}&lyricCheckSum=${req.query.lyricCheckSum}`)
    const xml = await response.text();
    try {
      const data = xml2js(xml, { compact: true });
      res.status(200).send(data.GetLyricResult.Lyric._text);
    }
    catch (error) {
      res.status(500).send(JSON.parse(error))
    }
  })
  const PORT = process.env.PORT || 4000;
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
};

startServer();