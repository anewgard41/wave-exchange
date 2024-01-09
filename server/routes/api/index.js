const router = require('express').Router();
const chartRoutes = require('./chartLyrics');

router.use('/chartlyrics', chartRoutes);

module.exports = router;