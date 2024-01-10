const router = require("express").Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  console.log("search route hit");
  try {
    let startTime = new Date();
    const response = await axios.get(
      `http://api.chartlyrics.com/apiv1.asmx/SearchLyricText?lyricText=${encodeURIComponent(
        req.query.lyricText
      )}`
    );
    const xml = await response.text();
    console.log('Fetch time: ', (new Date() - startTime) / 1000)

    startTime = new Date();
    const data = xml2js(xml, { compact: true });
    console.log('Parse time: ', (new Date() - startTime) / 1000)
    //console.log(data.ArrayOfSearchLyricResult.SearchLyricResult)
    const results = data.ArrayOfSearchLyricResult.SearchLyricResult.map(
      (result) => ({
        id: result.LyricId._text,
        checksum: result.LyricChecksum._text,
        name: result.Song._text,
        artists: [result.Artist._text]
      })
    ).filter((x) => Object.keys(x).length === 8);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/lyric", async (req, res) => {
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
    res.status(500).send(error);
  }
});

module.exports = router;
