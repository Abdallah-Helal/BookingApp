const User = require("../models/UserModel");
const handleFactory = require("../controllers/handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.updateUser = handleFactory.updateOne(User);
exports.deleteUser = handleFactory.deleteOne(User);
exports.getUser = handleFactory.getOne(User);
exports.getUsers = handleFactory.getALL(User);

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
