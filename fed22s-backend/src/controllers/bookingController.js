const Booking = require("../models/Booking");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    if (!danceClasses) {
      throw new NotFoundError("Finns inga klasser tyvärr!");
    }

    return res.json({
      data: danceClasses,
    });
  } catch (error) {
    next(error);
  }
};
