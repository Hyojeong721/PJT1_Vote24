const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    // 폴더 위치 지정
    destination: (req, file, done) => {
      done(null, "uploads/");
    },

    filename: (req, file, done) => {
      const ext = path.extname(file.originalName);
      // aaa.txt
      // aaa+&&+129371271874.txt
      const fileName = path.basename(file.originalName, ext) + Date.now() + ext;
      done(null, fileName);
    },
  }),
  limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload };
