const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.getAllBookings = async (req, res, next) => {
  try {
    const date = req.query.date;

    if (date) {
      const bookings = await Booking.find({ date: date });
      if (!bookings) {
        throw new NotFoundError("Finns inga bokningar tyvärr!");
      }

      return res.json(bookings);
    } else {
      const bookings = await Booking.find();
      if (!bookings) {
        throw new NotFoundError("Finns inga bokningar tyvärr!");
      }

      return res.json(bookings);
    }
  } catch (error) {
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
 
  try {
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
      guest: guest,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailText = `
    Datum: ${newBooking.date}\
    Tid: ${newBooking.time}\
    Antal Personer: ${newBooking.amountOfPersons}\
    Bokningsnummer: ${newBooking._id.toString()}\
    Välkommen!
     `;

    let mailOptions = {
      from: "The restaurant",
      to: guest.email,
      subject: "Tack för din bokning",
      text: "Här kommer ditt bokningsnummer: ", // plain text body
      html: mailText,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/bookings/${newBooking._id}`
      )
      .status(201)
      .json(newBooking);
  } catch (error) {
    next(error);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const bookingToDelete = await Booking.findById(bookingId);
    if (!bookingToDelete) throw new NotFoundError("Denna bokning finns inte!");

    await bookingToDelete.delete();

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new NotFoundError("Denna bokning finns inte!");

    return res.json(booking);
  } catch (error) {
    next(error);
  }
};
