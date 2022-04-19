const express = require("express");
const router = express.Router();
const {
  signInController,
  signUpController,
  logOutController,
} = require("../controllers/auth.controller");
const {
  checkDuplicateUser,
} = require("../middlewares/checkDuplicates.middleware");
const {
  verifySpecuialCharacter,
} = require("../middlewares/specialCharacters.middleware");

router.post(
  "/signup",
  [verifySpecuialCharacter, checkDuplicateUser],
  signUpController
);
router.post("/signin", signInController);
router.post("/logout", logOutController);

exports.default = router;
