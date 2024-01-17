const { Schema } = require("mongoose");

// Music schema
const musicSchema = new Schema({
  artists: [
    {
      type: String,
    },
  ],
  id: {
    type: String,
    required: true,
  },
  checksum: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = musicSchema;
