const catchAsync = require("../utils/catchAsync");
const Room = require("../models/RoomModel");
const Hotel = require("../models/HotelModel");

const handleFactory = require("../controllers/handlerFactory");

exports.updateRoom = handleFactory.updateOne(Room);
exports.getRoom = handleFactory.getOne(Room);
exports.getRooms = handleFactory.getALL(Room);

exports.createRoom = catchAsync(async (req, res, next) => {
  const newRoom = await Room.create(req.body);

  const hotelId = req.params.hotelid;
  await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });

  res.status(200).json(newRoom);
});

exports.updateRoomAvailability = async (req, res, next) => {
  await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates,
      },
    }
  );
  res.status(200).json("Room status has been updated.");
};

exports.deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;
  await Room.findByIdAndDelete(roomId);

  const hotelId = req.params.hotelid;
  await Hotel.findByIdAndUpdate(hotelId, {
    $pull: { rooms: roomId },
  });

  res.status(200).json("Room has been deleted.");
};
