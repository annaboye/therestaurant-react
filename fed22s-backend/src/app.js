require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);

  next();
});

app.use("/api/v1/bookings", bookingRoutes);

const port = process.env.PORT || 5000;
async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
