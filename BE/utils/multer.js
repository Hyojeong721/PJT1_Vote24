const multer = require('multer');
const path = require("path");

/*-------------------------------------------------------------------------*/
const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploads/logo");
  },
  filename: (req, file, done) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext) + ext;
    done(null, fileName);
  },
  limits: { fileSize: 5 * 1024 * 1024 }
})

const logo_upload = multer({ storage : storage });

/*-------------------------------------------------------------------------*/
const event_storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploads/event/");
  },
  filename : (req, file, done) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext) + ext;
    done(null, fileName);
  },
  limits : {
    fileSize: 5 * 1024 * 1024
  }
})

const event_upload = multer({storage : event_storage});

/*-------------------------------------------------------------------------*/
const service_storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploads/service/");
  },
  filename : (req, file, done) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext) + ext;
    done(null, fileName);
  },
  limits : {
    fileSize: 5 * 1024 * 1024
  }
})

const service_upload = multer({storage : service_storage});

/*-------------------------------------------------------------------------*/
const notice_storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploads/notice/");
  },
  filename : (req, file, done) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext) + ext;
    done(null, fileName);
  },
  limits : {
    fileSize: 5 * 1024 * 1024
  }
})

const notice_upload = multer({storage : notice_storage});


module.exports = {logo_upload, event_upload, service_storage, notice_storage};
