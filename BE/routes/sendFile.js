const express = require("express");
const path = require("path");

const router = express.Router();

router.post("/logoimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/logo/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});
router.post("/serviceimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/service/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});
router.post("/eventimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/event/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});
router.post("/noticeimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/notice/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});

module.exports = router;
