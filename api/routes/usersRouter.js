const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/:id")
  .put(
    authController.protect,
    authController.verifyUser,
    userController.updateUser
  ) //UPDATE
  .get(
    authController.protect,
    authController.verifyUser,
    userController.getUser
  ) //GET
  .delete(
    authController.protect,
    authController.verifyAdmin,
    userController.deleteUser
  ); //DELETE

router.delete(
  "/deleteMe",
  authController.protect,
  authController.verifyUser,
  userController.deleteMe
);

//GET ALL
router.get(
  "/",
  authController.protect,
  authController.verifyAdmin,
  userController.getUsers
);

module.exports = router;
