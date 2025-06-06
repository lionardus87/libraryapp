const express = require("express");
const router = express.Router();

const { handleBorrowBook } = require("../controllers/borrowController");

router.post("/", handleBorrowBook); // POST /borrow

module.exports = router;
