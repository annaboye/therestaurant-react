const express = require("express");

const router = express.Router();


const {
    getAllBookings, 
    createBooking,
    deleteBooking

  } = require("../controllers/bookingController");


  
  router.get("/", getAllBookings);
  router.post("/", createBooking);
  router.delete("/:bookingId", deleteBooking);
  
  

   
  module.exports = router;