const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploads/");
  },
  filename: (req, file, done) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext) + ext;
    done(null, fileName);
  },
  limits: { fileSize: 5 * 1024 * 1024 }
})

const upload = multer({ storage : storage });

module.exports = {upload};
