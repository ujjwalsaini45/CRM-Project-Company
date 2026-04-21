// src/models/Lead.js

const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  status: { type: String, default: "new" },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead; // ← must be exactly this