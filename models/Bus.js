const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: String,
  totalSeats: Number,
  bookedSeats: [Number],
});

module.exports = mongoose.model("Bus", busSchema);
