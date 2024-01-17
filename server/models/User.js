const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const musicSchema = require("./Music");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    donation: {
      type: Number,
      required: true,
      default: 0,
    },
    savedMusic: [musicSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual called donationTotal for future dev. Totals a user's donations, could be used to determine user's position on leaderboard.
userSchema
  .virtual("donationTotal")
  .get(() => {
    return this.donation;
  })
  .set((newDonation) => {
    this.donation += newDonation;
  });

// pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// musicList virtual that returns and adds to savedMusic array
userSchema
  .virtual("musicList")
  .get(() => {
    return this.savedMusic;
  })
  .set((song) => {
    this.savedMusic.push(song);
  });

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
