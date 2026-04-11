const express = require("express");

const router = express.Router();
const { createParticipants } = require("../controller/participants");

router.get("/", (req, res) => {
  return res.send("This is the CodeClash API");
});
router.get("/v1/test", (req, res) => {
  res.send("This is a test route for v1 API");
});

router.post("/v1/participants", createParticipants);

module.exports = router;
