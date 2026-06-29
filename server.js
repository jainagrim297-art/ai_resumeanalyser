require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");
const {invokeGeminiAi} = require("./src/services/ai.service");

connectDB()

// invokeGeminiAi("gemini-2.5-flash" , "Hello gemini! Exlain what is Interview ?");



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})