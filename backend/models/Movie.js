const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  year: Number,
  rating: Number,
  duration: String,
  thumbnail: String,
});

module.exports = mongoose.model("Movie", movieSchema);
