const express = require("express");
const hotelController = require("../controllers/hotelController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.verifyAdmin,
    hotelController.createHotel
  )
  .get(hotelController.getHotels);

router
  .route("/find/:id")
  .put(
    authController.protect,
    authController.verifyAdmin,
    hotelController.updateHotel
  )
  .get(hotelController.getHotel)
  .delete(
    authController.protect,
    authController.verifyAdmin,
    hotelController.deleteHotel
  );

router.get("/room/:id", hotelController.getHotelRooms);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);
module.exports = router;
