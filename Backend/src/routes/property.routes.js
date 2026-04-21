const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

router.post("/", async (req, res) => {
  const property = await Property.create(req.body);
  res.json(property);
});

router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

module.exports = router; // ← make sure this line exists and is SAVED