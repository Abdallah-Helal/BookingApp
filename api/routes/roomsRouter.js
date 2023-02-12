const roomController = require("../controllers/roomController");
const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.get("/", roomController.getRooms);

router.post(
  "/:hotelid",
  authController.protect,
  authController.verifyAdmin,
  roomController.createRoom
);

router.put("/availability/:id", roomController.updateRoomAvailability);

router
  .route("/:id")
  .put(
    authController.protect,
    authController.verifyAdmin,
    roomController.updateRoom
  )
  .get(roomController.getRoom);

router.delete(
  "/:id/:hotelid",
  authController.protect,
  authController.verifyAdmin,
  roomController.deleteRoom
);

module.exports = router;
