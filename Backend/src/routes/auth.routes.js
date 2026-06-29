const express = require('express');
const authMiddleware = require("../middleware/auth.middleware");
const authcontroller = require("../controllers/auth.controller");

const router = express.Router();


/**
 * @route POST /api/auth
 * @desc Register a new user
 * @access Public
 */

router.post("/register",authcontroller.registerUserController);

router.post("/login",authcontroller.loginUserController);

router.get("/logout",authcontroller.logoutUSerController);

router.get("/getme", authMiddleware.authUser, authcontroller.getMeController);





module.exports = router;

