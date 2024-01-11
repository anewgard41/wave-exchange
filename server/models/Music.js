const { Schema } = require('mongoose');

const musicSchema = new Schema({
    artists: [
        {
            type: String,
        },
    ],
    id: {
        type: String,
        required: true,
        unique: true,
    },
    checksum: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = musicSchema;