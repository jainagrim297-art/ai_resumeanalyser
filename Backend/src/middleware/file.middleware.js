const multer = require("multer")


const upload = multer({
    storage : multer.memoryStorage(),
    limits: {
        fileSize: 3*1024*1024
    },

    fileFilter : (req , file , cb) => {
        if(file.mimetype.startsWith("image/")) {
            cb(null,true)
        }
        else {
            cb(new Error("Invalid file type"),false)
        }
    }
})




module.exports = { upload }