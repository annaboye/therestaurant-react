const Booking = require("../models/Booking");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    if (!danceClasses) {
      throw new NotFoundError("Finns inga bokningar tyvärr!");
    }

    return res.json({
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};



exports.createBooking = async (req, res, next) => {
  const date = req.body.date;
  const time = req.body.time;
    const amountOfPersons = req.body.amountOfPersons;
    const description = req.body.description || " "; 
    const guest = req.body.guest; 



  const newBooking = await Booking.create({
    date: date,
    time: time,
      amountOfPersons: amountOfPersons,
      description: description,
    guest: guest
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/bookings/${newBooking._id}`
    )
    .status(201)
    .json(newBooking);

}