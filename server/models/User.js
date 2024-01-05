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
      minlength: 8,
    },
    donation: {
        type: Number,
        required: true,
        default: 0
    },
    savedMusic: [musicSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema
  .virtual("donationTotal")
  .get(() => {
    return this.donation;
  })
  .set((newDonation) => {
    this.donation += newDonation;
  });

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.virtual('musicList')
.get(()=>{
    return this.savedMusic;
})
.set((song)=>{
    this.savedMusic.push(song);
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
