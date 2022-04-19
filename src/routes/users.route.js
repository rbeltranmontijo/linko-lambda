const express = require("express");
const router = express.Router();
const { getUsersController } = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/authJwt.middleware");

router.get("/", verifyToken, getUsersController);

exports.default = router;
