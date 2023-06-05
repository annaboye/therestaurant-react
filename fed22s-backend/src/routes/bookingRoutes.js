const express = require("express");

const router = express.Router();


const {
    getAllBookings, 
    createBooking,
    deleteBooking,
    getBookingById

  } = require("../controllers/bookingController");


  
  router.get("/", getAllBookings);
  router.post("/", createBooking);
  router.get("/:bookingId", getBookingById);
  router.delete("/:bookingId", deleteBooking);
  
  

   
  module.exports = router;