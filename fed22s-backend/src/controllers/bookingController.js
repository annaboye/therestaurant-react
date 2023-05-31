const Booking = require("../models/Booking");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    if (!bookings) {
      throw new NotFoundError("Finns inga bokningar tyvärr!");
    }

    return res.json({
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};



exports.createBooking = async (req, res) => {
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

};

exports.deleteBooking = async (req, res) => {
    const bookingId = req.params.bookingId;
    const bookingToDelete = await Booking.findById(bookingId);
    if (!bookingToDelete) throw new NotFoundError("Denna bokning finns inte!");

    await bookingToDelete.delete();

    return res.sendStatus(204);
};