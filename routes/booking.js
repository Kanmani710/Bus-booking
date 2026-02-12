// routes/booking.js
const express = require("express");
const Booking = require("../models/Booking");
const Bus = require("../models/Bus");
const verify = require("../verifyToken");
const router = express.Router();

// Book a seat
router.post("/:busId", verify, async (req, res) => {
  const { seatNumber } = req.body;
  const bus = await Bus.findById(req.params.busId);

  if (bus.bookedSeats.includes(seatNumber)) {
    return res.status(400).json({ message: "Seat already booked" });
  }

  bus.bookedSeats.push(seatNumber);
  await bus.save();

  const booking = new Booking({
    userId: req.user.id,
    busId: bus._id,
    seatNumber,
  });
  await booking.save();

  res.json(booking);
});

// View user bookings
router.get("/my", verify, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate(
    "busId"
  );
  res.json(bookings);
});

module.exports = router;
