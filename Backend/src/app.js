const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Debug - add these lines temporarily
const leadRouter = require("./routes/lead.routes");
const propertyRouter = require("./routes/property.routes");

console.log("lead router type:", typeof leadRouter);
console.log("property router type:", typeof propertyRouter);

app.use("/api/leads", leadRouter);
app.use("/api/properties", propertyRouter);

module.exports = app;