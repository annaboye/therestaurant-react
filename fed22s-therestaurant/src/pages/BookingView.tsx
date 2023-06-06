import { IBooking } from "../models/IBooking";
import { useContext, useEffect, useState } from "react";

import { BookingContext } from "../contexts/BookingContext";
import { getBookingById } from "../services/getBookingById";
import { useParams } from "react-router";

