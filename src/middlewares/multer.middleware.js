const multer = require("multer");

const storage = multer.diskStorage({
    
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}-${file.originalname}`;
        cb(null, filename);
    }
});

module.exports.upload = multer({ 
    storage, 
});