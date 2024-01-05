const { Schema } = require('mongoose');

const musicSchema = new Schema({
    artists: [
        {
            type: String,
        },
    ],
    songId: {
        type: String,
        required: true,
    },
    songTitle: {
        type: String,
    }
})

module.exports = musicSchema;