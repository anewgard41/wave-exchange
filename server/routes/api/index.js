const router = require('express').Router();
const userRoutes = require('./chartLyrics');

router.use('/u', userRoutes);

module.exports = router;