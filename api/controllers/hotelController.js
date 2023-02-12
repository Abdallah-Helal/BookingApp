const catchAsync = require("../utils/catchAsync");
const Hotel = require("../models/HotelModel");
const Room = require("../models/RoomModel");

const handleFactory = require("../controllers/handlerFactory");

exports.createHotel = handleFactory.createOne(Hotel);
exports.updateHotel = handleFactory.updateOne(Hotel);
exports.getHotel = handleFactory.getOne(Hotel);
exports.deleteHotel = handleFactory.deleteOne(Hotel);

exports.getHotelRooms = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  const list = await Promise.all(
    hotel.rooms.map((room) => {
      return Room.findById(room);
    })
  );
  res.status(200).json(list);
};

exports.countByCity = catchAsync(async (req, res, next) => {
  const cities = req.query.cities.split(",");

  const list = await Promise.all(
    cities.map((city) => {
      return Hotel.countDocuments({ city: city });
    })
  );
  res.status(200).json(list);
});

exports.countByType = catchAsync(async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  res.status(200).json([
    { type: "hotel", count: hotelCount },
    { type: "apartments", count: apartmentCount },
    { type: "resorts", count: resortCount },
    { type: "villas", count: villaCount },
    { type: "cabins", count: cabinCount },
  ]);
});

exports.getHotels = catchAsync(async (req, res, next) => {
  const { min, max, ...others } = req.query;
  const hotels = await Hotel.find({
    ...others,
    cheapestPrice: { $gt: min | 1, $lt: max || 999 },
  }).limit(req.query.limit);
  res.status(200).json(hotels);
});
