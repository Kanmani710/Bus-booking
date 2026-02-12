const express = require("express");
const Bus = require("../models/Bus");
const verify = require("../verifyToken");
const router = express.Router();

// Create a new bus
router.post("/", verify, async (req, res) => {
  const { name, totalSeats } = req.body;
  const bus = new Bus({ name, totalSeats, bookedSeats: [] });
  await bus.save();
  res.json(bus);
});

// Get all buses
router.get("/", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

module.exports = router;
