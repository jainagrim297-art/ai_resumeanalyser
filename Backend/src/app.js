const express = require("express");


const app = express();

app.use(express.json());


const authRouter = require("./routes/auth.routes.js")
const interviewRouter = require("./routes/interview.routes.js")


app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;