const express = require("express");

const interviewRouter = express.Router()
const authMiddleware = require("../middleware/auth.middleware.js")
const interviewController = require("../controllers/interview.controller.js")
const { upload } = require("../middleware/file.middleware.js")


/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of  user self description on the basis of userself description , resume pdf and job description
 * @access private
 * @acc
 */
interviewRouter.post("/",authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReport)
interviewRouter.get("/history", authMiddleware.authUser, interviewController.getInterviewHistory)

module.exports = interviewRouter;
