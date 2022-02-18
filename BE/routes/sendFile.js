const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/logoimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/logo/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});
router.get("/serviceimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/service/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});
router.get("/eventimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/event/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});
router.get("/noticeimage/:image", async (req, res) => {
  const image = req.params.image;
  res.sendFile(path.join(__dirname, "../uploads/notice/" + image));
  //   res.sendFile(path.join(__dirname, "../uploads/service/flower.png"));
});

module.exports = router;
