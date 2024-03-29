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

// Create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: "bounded",
});

// Start the Apollo server and integrate with Express
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

  // Handle requests for the /api/search path
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
      const results = data.ArrayOfSearchLyricResult.SearchLyricResult.filter(
        (x) => Object.keys(x).length > 1
      ).map((result) => ({
        id: result.LyricId._text,
        checksum: result.LyricChecksum._text,
        name: result.Song._text,
        artists: [result.Artist._text],
      }));
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  // Handle requests for the /api/lyric path
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

  // Stripe payment route
  app.post("/api/payment", async (req, res) => {
    console.log("Received payment request:", req.body);
    const amount = req.body.amount;
    let purchaseItem = [];
    switch (amount) {
      case 500:
        purchaseItem = {
          // 5 dollars // test price: price_1OVgh0JiSz0z5LGkNTChdRo1 // live price: price_1OXZEQJiSz0z5LGkxDGwM0Mc
          price: "price_1OVgh0JiSz0z5LGkNTChdRo1",
          quantity: 1,
        };
        break;
      case 1000:
        purchaseItem = {
          // 10 dollars
          price: "price_1OXZEgJiSz0z5LGkP8zKbg0e",
          quantity: 1,
        };
        break;
      case 2000:
        purchaseItem = {
          // 20 dollars
          price: "price_1OXZEwJiSz0z5LGkK2388E7u",
          quantity: 1,
        };
        break;
      case 5000:
        purchaseItem = {
          // 50 dollars
          price: "price_1OXZFBJiSz0z5LGkeVyQ89Xx",
          quantity: 1,
        };
        break;
      default:
        // Handle cases where the amount doesn't match any of the specified cases
        res.status(400).json({ success: false, error: "Invalid amount" });
        return;
    }
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        return_url:
          `http://localhost:4000/donate` ||
          `https://wave-exchange.onrender.com/`,
        line_items: [purchaseItem],
        mode: "payment",
      });
      console.log(session);

      const successUrl = `${process.env.CLIENT_URL}/payment?amount=${amount}&session_id=${session.id}`;
      res.send({ clientSecret: session.client_secret, successUrl });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  app.get("/api/session-status", async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  });

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // defining the port
  const PORT = process.env.PORT || 3000;
  try {
    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    });
  } catch (err) {
    console.log("Could not connect to server: server.js line 187.", err);
  }
};

// Start the server
try {
  startServer();
} catch (err) {
  console.log(err);
}
