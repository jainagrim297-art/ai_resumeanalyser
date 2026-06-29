const mongoose = require("mongoose");


async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URl)

        console.log("Connected to DataBase")
    }
    catch(error){
        console.error("Error connecting to database:", error)
    }
}

module.exports = connectDB;