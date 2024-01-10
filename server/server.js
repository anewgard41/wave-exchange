const express = require("express");
//const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const { xml2js } = require("xml-js");
const db = require("./config/connection");
const { ApolloServer } = require("apollo-server-express");
const { expressMiddleware } = require("@apollo/server/express4");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: "bounded",
});

const startServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  //app.use(routes);
  server.applyMiddleware({ app });

  try {
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );
  } catch (err) {
    console.log(
      "Could not apply graphql expressMiddleware to server: server.js line 29.",
      err
    );
  }
  // Handle requests for the root path
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

  app.get("/api/search", async (req, res) => {
    console.log("search route hit");
    try {
      const response = await fetch(
        `http://api.chartlyrics.com/apiv1.asmx/SearchLyricText?lyricText=${encodeURIComponent(
          req.query.lyricText
        )}`
      );
      const xml = await response.text();
  
      const data = xml2js(xml, { compact: true });
      //console.log(data.ArrayOfSearchLyricResult.SearchLyricResult)
      const results = data.ArrayOfSearchLyricResult.SearchLyricResult.filter(x => Object.keys(x).length > 1).map(
        (result) => ({
          id: result.LyricId._text,
          checksum: result.LyricChecksum._text,
          name: result.Song._text,
          artists: [result.Artist._text]
        })
      );
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  app.get("/api/lyric", async (req, res) => {
    if (!req.query.lyricId || !req.query.lyricCheckSum) {
      res.status(400).send("Missing query parameter");
      return;
    }
  
    const response = await fetch(
      `http://api.chartlyrics.com/apiv1.asmx/GetLyric?lyricId=${req.query.lyricId}&lyricCheckSum=${req.query.lyricCheckSum}`
    );
    const xml = await response.text();
    try {
      const data = xml2js(xml, { compact: true });
      res.status(200).send(data.GetLyricResult.Lyric._text);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: `$${amount / 100} donation to Wave Exchange`,
        payment_method: id,
        confirm: true,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  });

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.send("Hello, You're lost!");
    });
  }

  const PORT = process.env.PORT || 3000;
  try {
    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    });
  } catch (err) {
    console.log("Could not connect to server: server.js line 85.", err);
  }
};

try {
  startServer();
} catch (err) {
  console.log(err);
}
